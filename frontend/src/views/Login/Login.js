import { useEffect, useState, Redirect } from "/jk"
import Header from "../../components/Header/Header.js"

import {
	doc,
    setDoc

} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js";

export default function Login(props) {

    const [ui, setUi] = useState([jk.global, 'authui'], undefined)

    const [user, setUser] = useState([jk.global, 'user'], undefined)

    console.log(user)
    
    if (user !== undefined){
        alert('Already logged in')
        Redirect('/')
    }

    useEffect([Login, 'authUI'], () => {
        ui.start('#firebaseui-auth-container', {
            signInOptions: [
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.FacebookAuthProvider.PROVIDER_ID
            ],
            callbacks:{
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