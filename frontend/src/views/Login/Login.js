import { useEffect, useState, Redirect } from "/jk"
import Header from "../../components/Header/Header.js"

import {
	doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js";

export default function Login() {

    // Insert the authentication UI into the DOM, after render
    useEffect([Login, 'authUI'], () => {
        jk.global.authUi.start('#firebaseui-auth-container', {
            signInOptions: [
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
                // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                // firebase.auth.FacebookAuthProvider.PROVIDER_ID
            ],
            callbacks:{
                // Sign in succes
                signInSuccessWithAuthResult: (authResult, redirectUrl) => {
                    // New user created
                    if (authResult.additionalUserInfo.isNewUser === true){
                        // Set doc in users collection
                        setDoc(doc(jk.global.db, 'users', authResult.user.uid), {
                            subscription: {
                                subscriptionType: null,
                                lastPayment: null
                            },
                            collections: [
                                {
                                    name: 'Favoritter',
                                    videos: []
                                }
                            ],
                        })
                    }
                    // Redirect to home
                    Redirect('/')
                }
            },
            signInSuccessUrl: '/'
        })
    })
    
    return (/*html*/`
        ${Header()}
        <div class="view__login">
            <div id="firebaseui-auth-container"></div>
        </div>
    `)
}