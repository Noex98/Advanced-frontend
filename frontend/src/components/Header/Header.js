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

    window.showDropdown = ()  => {
            document.getElementById("dropdown-header").classList.toggle("active")
    }
    function displayName(){
       let HTMLTemplate = ""

       if (user == undefined){
           HTMLTemplate +=(/*html*/`
            <a class="jk-link" href="/login">Log Ind</a>`)
       } else{
        HTMLTemplate +=(/*html*/`   
        <div class="dropdown profile" onclick="showDropdown()">
               
        <img id="profile-img" src="/media/icons/Profile.svg"/>
        <h3>${user.displayName}</h3>
   
        <div class="dropdown-content" id="dropdown-header">

            <div onclick="jk.Header.logout()" style="display:flex; flex-direction: collumn; align-items: center; margin-bottom: 7px">
                <img src="/media/icons/Logout.svg" class="dropdown-icon"/>
                <div>Log ud</div>
            </div>
            <a class="jk-link" href="/Settings" style="display:flex; flex-direction: collumn; align-items: center;">
                <img src="/media/icons/settings.svg" class="dropdown-icon"/>
                <div>Indstillinger</div>
            </a>
        </div>

        </div>
        `)
       }
       return HTMLTemplate
    }
console.log(user);
    return (/*html*/`
        <header>
            <a href="/" class="jk-link">
                <div class="header__logo">
                    <img src="/media/Logo.png" alt="logo" class="logo"/>
                </div>
            </a>
        ${displayName()}
         
        </header>
    `)
}