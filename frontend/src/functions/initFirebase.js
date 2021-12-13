import { useState } from '/jk'

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import {
	getFirestore,
	collection,
    getDoc,
    getDocs,
	onSnapshot,
	doc,
	updateDoc,
	deleteDoc,
	addDoc
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js";
import {
	getAuth,
	onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";

export default function initFirebase(){

    const firebaseConfig = {
        apiKey: "AIzaSyDvdRD8Rd4NCFwVXKDB7EzjPoYiRkjM36E",
        authDomain: "advanced-front-736f7.firebaseapp.com",
        projectId: "advanced-front-736f7",
        storageBucket: "advanced-front-736f7.appspot.com",
        messagingSenderId: "59273238060",
        appId: "1:59273238060:web:6a7ce1096eb4d2fe97a389",
        measurementId: "G-C6B05V5YK7"
    };
    
    // Initialize Firebase
    initializeApp(firebaseConfig);
    jk.global.db = getFirestore();
    jk.global.auth = getAuth();

    // Initialize Firebase UI (non modular)
    firebase.initializeApp(firebaseConfig);
    
    // Videos state
    const videosRef = collection(jk.global.db, 'videos')
    const [videos, setVideos] = useState([jk.global, 'videos'], undefined)
    getDocs(videosRef)
        .then((snapshot) => {
            let output = []
            snapshot.forEach( doc => {
                let item = doc.data()
                item.id = doc.id
                output.push(item)
            })
            setVideos(output)
        })

    // Filters state
    const filtersRef = collection(jk.global.db, 'filters')
    const [filters, setFilters] = useState([jk.global, 'filters'], undefined)
    getDocs(filtersRef)
        .then((snapshot) => {
            let output = []
            snapshot.forEach( doc => {
                let item = doc.data()
                item.id = doc.id
                output.push(item)
            })
            setFilters(output)
        })

    //################       Auth         ##############
    
    // User state
    const [user, setUser] = useState([jk.global, 'user'], undefined)

    // Enable authUi for global use 
    let authUi = new firebaseui.auth.AuthUI(firebase.auth())
    jk.global.authUi = authUi
    

    // Listen for auth state change
    onAuthStateChanged(jk.global.auth, authData => { 
        // Logged in
        if (authData) {
            // Get extra user data from firestore
            getDoc(doc(jk.global.db, 'users', authData.uid))
                .then((firestoreData) => {

                    // Let unmodified data from user accesible globaly
                    jk.global.userData = firestoreData.data()

                    // Set user state
                    setUser({
                        displayName: authData.displayName,
                        email: authData.email,
                        phoneNumber: authData.phoneNumber,
                        uid: authData.uid,
                        ... firestoreData.data(),
                    })
                })
        } else {
            // User is signed out
            setUser(undefined)
        }
    });
}

