import './style.css';
import { FaceTracker } from './face-tracking.js';
import { GravityGame } from './game.js';

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
            game.flipGravity();
        };

        faceTracker.onRightWink = () => {
            game.shoot();
        };

        faceTracker.onLeftWink = () => {
            game.boostSpeed();
        };
    };

    restartBtn.onclick = () => {
        gameOverMenu.classList.add('hidden');
        game.restart();
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
