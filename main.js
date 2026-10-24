import './style.css';
import { FaceTracker } from './face-tracking.js';
import { GravityGame } from './game.js';
import { getTopScores, saveScore } from './firebase.js';

const webcam = document.getElementById('webcam');
const landmarks = document.getElementById('landmark-overlay');
const calibrationMenu = document.getElementById('calibration-menu');
const instructionMenu = document.getElementById('instructions-menu');
const startCalibrationBtn = document.getElementById('start-calibration');
const startGameBtn = document.getElementById('start-game');
const gameOverMenu = document.getElementById('game-over-menu');
const restartBtn = document.getElementById('restart-game');
const sensitivitySlider = document.getElementById('sensitivity-slider');
const landmarkToggle = document.getElementById('toggle-landmarks');
const progressLine = document.getElementById('calibration-progress');
const calibCount = document.getElementById('calib-count');
const statusText = document.getElementById('calibration-status');
const sensitivityValue = document.getElementById('sensitivity-value');
const gestureFeedback = document.getElementById('gesture-feedback');
const saveScoreChoice = document.getElementById('save-score-choice');
const skipScore = document.getElementById('skip-score');
const scoreForm = document.getElementById('score-form');
const playerName = document.getElementById('player-name');
const scoreSaveStatus = document.getElementById('score-save-status');
const leaderboardList = document.getElementById('leaderboard-list');
const leaderboardMenu = document.getElementById('leaderboard-menu');
const homeLeaderboardList = document.getElementById('home-leaderboard-list');
const openLeaderboard = document.getElementById('open-leaderboard');
const closeLeaderboard = document.getElementById('close-leaderboard');

let faceTracker;
let game;
let calibrationSteps = 0;
const MAX_CALIBRATION_STEPS = 5;

async function init() {
    faceTracker = new FaceTracker(webcam, landmarks);

    try {
        await faceTracker.init();
        statusText.innerText = "Camera ready. You’re in the frame.";
        statusText.dataset.state = 'ready';
        startCalibrationBtn.innerText = "Start calibration";
        startCalibrationBtn.disabled = false;
    } catch (err) {
        statusText.innerText = "Camera access is needed to play. Check browser permissions and try again.";
        statusText.dataset.state = 'error';
        console.error(err);
    }

    game = new GravityGame('game-container', (finalScore) => {
        document.getElementById('final-score').innerText = finalScore;
        gameOverMenu.classList.remove('hidden');
        resetScoreSaveState();
        renderLeaderboard(leaderboardList);
    });

    setupListeners();
}

function setupListeners() {
    startCalibrationBtn.onclick = () => {
        startCalibrationBtn.disabled = true;
        statusText.innerText = "Blink naturally · 0 of 5 captured";
        statusText.dataset.state = 'active';
        let minEARDuringBlink = 1.0;

        // Sample EAR during calibration to find the best threshold
        const calibrationInterval = setInterval(() => {
            if (faceTracker.lastEAR > 0 && faceTracker.lastEAR < minEARDuringBlink) {
                minEARDuringBlink = faceTracker.lastEAR;
            }
        }, 50);

        faceTracker.onBlink = () => {
            calibrationSteps++;
            const progress = (calibrationSteps / MAX_CALIBRATION_STEPS) * 100;
            progressLine.style.width = `${progress}%`;
            if (calibCount) calibCount.innerText = `${calibrationSteps} / ${MAX_CALIBRATION_STEPS}`;
            statusText.innerText = calibrationSteps >= MAX_CALIBRATION_STEPS
                ? 'Calibration complete.'
                : `Nice · ${calibrationSteps} of ${MAX_CALIBRATION_STEPS} captured`;

            if (calibrationSteps >= MAX_CALIBRATION_STEPS) {
                clearInterval(calibrationInterval);
                finishCalibration(minEARDuringBlink);
            }
        };
    };

    startGameBtn.onclick = () => {
        instructionMenu.classList.add('hidden');
        game.init();

        faceTracker.onBlink = () => {
            showGestureFeedback('GRAVITY FLIPPED', 'BLINK');
            game.flipGravity();
        };

        faceTracker.onRightWink = () => {
            showGestureFeedback('PULSE FIRED', 'RIGHT WINK');
            game.shoot();
        };

        faceTracker.onLeftWink = () => {
            showGestureFeedback('BOOST ACTIVE', 'LEFT WINK');
            game.boostSpeed();
        };
    };

    restartBtn.onclick = () => {
        gameOverMenu.classList.add('hidden');
        game.restart();
    };

    saveScoreChoice.onclick = () => {
        saveScoreChoice.classList.add('hidden');
        skipScore.classList.add('hidden');
        scoreForm.classList.remove('hidden');
        playerName.focus();
    };

    skipScore.onclick = () => {
        scoreSaveStatus.innerText = 'Run not saved.';
        scoreSaveStatus.dataset.state = 'muted';
        saveScoreChoice.disabled = true;
        skipScore.disabled = true;
    };

    scoreForm.onsubmit = async (event) => {
        event.preventDefault();
        const score = Number(document.getElementById('final-score').innerText);
        saveScoreChoice.disabled = true;
        scoreSaveStatus.innerText = 'Saving your run…';
        scoreSaveStatus.dataset.state = 'active';
        try {
            await saveScore(playerName.value, score);
            scoreForm.classList.add('hidden');
            scoreSaveStatus.innerText = 'Saved to the leaderboard.';
            scoreSaveStatus.dataset.state = 'success';
            await renderLeaderboard(leaderboardList, true);
        } catch (error) {
            saveScoreChoice.disabled = false;
            scoreSaveStatus.innerText = 'Could not save right now. Check your connection and try again.';
            scoreSaveStatus.dataset.state = 'error';
            console.error(error);
        }
    };

    openLeaderboard.onclick = () => {
        leaderboardMenu.classList.remove('hidden');
        renderLeaderboard(homeLeaderboardList);
    };

    closeLeaderboard.onclick = () => {
        leaderboardMenu.classList.add('hidden');
    };

    sensitivitySlider.oninput = (e) => {
        const value = parseFloat(e.target.value);
        faceTracker.setThreshold(value);
        sensitivityValue.innerText = value.toFixed(2);
    };

    landmarkToggle.onchange = (e) => {
        faceTracker.setShowLandmarks(e.target.checked);
    };

    // Update UI/Game state
    setInterval(() => {
        if (faceTracker && faceTracker.lastEAR) {
            const earVal = faceTracker.lastEAR.toFixed(3);
            if (game && game.game && game.player && game.player.active) {
                game.lastEAR = faceTracker.lastEAR;
            } else {
                const fpsDisp = document.getElementById('fps-display');
                const fpsValue = fpsDisp?.querySelector('.fps-value');
                if (fpsValue) fpsValue.innerText = `READY · EAR ${earVal}`;
            }
        }
    }, 100);
}

function finishCalibration(minEAR) {
    // Set threshold slightly above the minimum detected EAR during blink
    // Default is 0.25, if user's blink is 0.15, we set it to ~0.20
    const newThreshold = Math.min(0.35, minEAR + 0.05);
    faceTracker.setThreshold(newThreshold);
    sensitivitySlider.value = newThreshold;

    calibrationMenu.classList.add('hidden');
    instructionMenu.classList.remove('hidden');
}

init();

function resetScoreSaveState() {
    saveScoreChoice.classList.remove('hidden');
    saveScoreChoice.disabled = false;
    skipScore.classList.remove('hidden');
    skipScore.disabled = false;
    scoreForm.classList.add('hidden');
    scoreForm.reset();
    scoreSaveStatus.innerText = '';
    scoreSaveStatus.removeAttribute('data-state');
}

async function renderLeaderboard(listElement, forceRefresh = false) {
    listElement.innerHTML = '<li class="leaderboard-empty">Loading leaderboard…</li>';
    try {
        const scores = await getTopScores(forceRefresh);
        if (!scores.length) {
            listElement.innerHTML = '<li class="leaderboard-empty">Be the first run on the board.</li>';
            return;
        }
        listElement.innerHTML = scores.map((entry, index) => `
            <li><span class="leaderboard-rank">${String(index + 1).padStart(2, '0')}</span><strong>${escapeHtml(entry.name)}</strong><span>${entry.score}</span></li>
        `).join('');
    } catch (error) {
        listElement.innerHTML = '<li class="leaderboard-empty">Leaderboard unavailable right now.</li>';
        console.error(error);
    }
}

function escapeHtml(value) {
    return value.replace(/[&<>'"]/g, (character) => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    }[character]));
}

function showGestureFeedback(message, gesture) {
    if (!gestureFeedback) return;
    gestureFeedback.innerHTML = `<span>${gesture}</span><strong>${message}</strong>`;
    gestureFeedback.classList.remove('show');
    requestAnimationFrame(() => gestureFeedback.classList.add('show'));
    clearTimeout(showGestureFeedback.timeout);
    showGestureFeedback.timeout = setTimeout(() => gestureFeedback.classList.remove('show'), 900);
}
