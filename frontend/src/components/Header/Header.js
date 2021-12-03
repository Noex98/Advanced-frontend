import { useEffect, useState } from "/jk"
import {
	signOut
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";

export default function Header(){

    const [user, setUser] = useState([jk.global, 'user'], undefined)

    useEffect([Header, 'init'], () => {

        jk.Header = {}

        jk.Header.logout = () => {
            signOut(jk.global.auth);
        }

    }, [])

    function returnStatus(){
        if (user === true){
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
    window.showDropdown = ()  => {
            document.getElementById("dropdown-header").classList.toggle("active")
    }
console.log(user);
    return (/*html*/`
        <header>
            <a href="/" class="jk-link">
                <div class="header__logo">
                    <img src="/media/Logo.png" alt="logo" class="logo"/>
                </div>
            </a>

            <div class="dropdown profile" onclick="showDropdown()">
               
                    <img src="/media/icons/Profile.svg"/>
                    <h3>${user.displayName}</h3>
               
                    <div class="dropdown-content" id="dropdown-header">
                        <button onclick="jk.Header.logout()">Logout</button>
                        ${returnStatus()}
                    </div>
            
            </div>
        </header>
    `)
}