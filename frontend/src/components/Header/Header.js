import { useEffect, useState } from "/jk"
import {
	signOut
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";

export default function Header(){

    let [loggedin, setLoggedin] = useState([jk.global, 'loggedin'], false)

    useEffect([Header, 'init'], () => {

        jk.Header = {}

        jk.Header.logout = () => {
            signOut(jk.global.auth);
        }

    }, [])

    function returnStatus(){
        if (loggedin === true){
            return (/*html*/`
                <div class="header__profileBtn">
                    <button onclick="jk.Header.logout()">Logout</button>
                </div>
            `)
        } else {
            return (/*html*/`
                <div class="header__sign">
                    <a href="login" class="jk-link">
                        login
                    </a>
                    <a href="signup" class="jk-link">
                        signup
                    </a>
                </div>
            `)
        }
    }

    return (/*html*/`
        <header>
            <a href="/" class="jk-link">
                <div class="header__logo">
                    <img src="" alt="logo" />
                </div>
            </a>
            <button onclick="jk.Header.logout()">Logout</button>
            
            ${returnStatus()}
            
        </header>
    `)
}