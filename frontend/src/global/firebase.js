import {useState} from '/jk'

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
    const _db = getFirestore();
    
    // Video list state
    const _videosRef = collection(_db, 'videos')
    const [videos, setVideos] = useState([jk.global, 'videos'], undefined)
    getDocs(_videosRef)
        .then((snapshot) => {
            let output = []
            snapshot.forEach( doc => {
                let item = doc.data()
                item.id = doc.id
                output.push(item)
            })
            setVideos(output)
        })

    const auth = getAuth()
}