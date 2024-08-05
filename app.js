// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

const loginButton = document.getElementById('google-login-button');
const supportButton = document.getElementById('support-button');
const supportersCount = document.getElementById('supporters-count');

let user = null;

auth.onAuthStateChanged(u => {
    if (u) {
        user = u;
        loginButton.style.display = 'none';
        supportButton.style.display = 'block';
    } else {
        user = null;
        loginButton.style.display = 'block';
        supportButton.style.display = 'none';
    }
});

loginButton.addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).catch(error => {
        console.error('Error during sign in:', error);
    });
});

supportButton.addEventListener('click', () => {
    if (user) {
        db.collection('supporters').doc(user.uid).set({
            email: user.email,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            updateSupportersCount();
        }).catch(error => {
            console.error('Error during voting:', error);
        });
    }
});

function updateSupportersCount() {
    db.collection('supporters').get().then(querySnapshot => {
        supportersCount.textContent = querySnapshot.size;
    });
}

// Initial count update
updateSupportersCount();
