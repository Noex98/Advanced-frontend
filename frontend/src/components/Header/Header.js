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

        jk.Header.showDropdown = ()  => {
            document.getElementById("dropdown-header").classList.toggle("dropdown-content--active")
        }

    }, [])

    

    function returnName(){
       let output = ""

       if (user === undefined){
           output = (/*html*/`
            <a class="jk-link" href="/login">Log Ind</a>`)

       } else {
            output = (/*html*/`
                <div class="dropdown profile" onclick="jk.Header.showDropdown()">
                        
                    <img id="profile-img" src="/media/icons/Profile.svg"/>
                    <h3>${user.displayName}</h3>

                    <div class="dropdown-content" id="dropdown-header">

                        <a class="jk-link" href="/settings" style="display:flex; flex-direction: collumn; align-items: center;">
                            <img src="/media/icons/settings-white.svg" class="dropdown-icon"/>
                            <div>Indstillinger</div>
                        </a>

                        <div onclick="jk.Header.logout()" style="display:flex; flex-direction: collumn; align-items: center; margin-bottom: 7px">
                            <img src="/media/icons/Logout-white.svg" class="dropdown-icon"/>
                            <div>Log ud</div>
                        </div>
                        
                    </div>

                </div>
            `)
        }

       return output
    }


    return (/*html*/`
        <header>
            <a href="/" class="jk-link">
                <div class="header__logo">
                    <img src="/media/Logo.svg" alt="logo" class="logo"/>
                    <div>Art of Yoga</div>
                </div>
            </a>
        ${returnName()}
         
        </header>
    `)
}