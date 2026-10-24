import { initializeApp } from 'firebase/app';
import {
    addDoc,
    collection,
    getFirestore,
    getDocs,
    limit,
    orderBy,
    query,
    serverTimestamp
} from 'firebase/firestore';

// Firebase Web config is public. Firestore security rules must still protect the project.
const firebaseConfig = {
    apiKey: 'AIzaSyBYcyLm4T0shOou-4MGHNVXPs5zHLgGn-Y',
    authDomain: 'workshops-96045.firebaseapp.com',
    projectId: 'workshops-96045',
    storageBucket: 'workshops-96045.firebasestorage.app',
    messagingSenderId: '888260270216',
    appId: '1:888260270216:web:d54901efcd4df74756a73d',
    measurementId: 'G-8KLTQMQ3PG'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const scoresCollection = collection(db, 'sleepy-dev-scores');
let leaderboardCache = null;
let leaderboardRequest = null;

export async function saveScore(playerName, score) {
    const name = playerName.trim().replace(/\s+/g, ' ').slice(0, 18);
    const safeScore = Math.max(0, Math.floor(Number(score) || 0));
    if (!name) throw new Error('Enter a name before saving.');

    await addDoc(scoresCollection, {
        name,
        score: safeScore,
        createdAt: serverTimestamp()
    });
    leaderboardCache = null;
}

export async function getTopScores(forceRefresh = false) {
    if (forceRefresh) leaderboardCache = null;
    if (leaderboardCache) return leaderboardCache;
    if (leaderboardRequest) return leaderboardRequest;

    // One bounded read: Firestore returns at most ten documents for each refresh.
    leaderboardRequest = getDocs(query(scoresCollection, orderBy('score', 'desc'), limit(10)))
        .then((snapshot) => snapshot.docs.map((entry) => ({ id: entry.id, ...entry.data() })))
        .then((scores) => {
            leaderboardCache = scores;
            return scores;
        })
        .finally(() => {
            leaderboardRequest = null;
        });

    return leaderboardRequest;
}
