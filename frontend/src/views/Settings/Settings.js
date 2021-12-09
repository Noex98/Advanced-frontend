import { useEffect, useState, Redirect } from "/jk"
import Header from "../../components/Header/Header.js"
import Aside from "../../components/Aside/Aside.js"

export default function Settings(props) {

    const [user, setUser] = useState([jk.global, 'user'], undefined)
    
    console.log(user);
    return (/*html*/`
    ${Header()}
    <div class="flex-wrapper">

        ${Aside()}
        <div class="view__settings">
        <h1>Indstillinger</h1>
        <h2>Kontooplysninger</h2>
        <form>
        <input type="text" id="name" placeholder="${user.displayName}" required>
        <input type="text" id="mail" placeholder="${user.email}" required>
        <input type="text" id="name" placeholder="Password" required>
        </form>
        <h2>Kortoplysniger</h2>
        <input type="text" id="name" placeholder="${user.displayName}" required>
        <input type="text" id="mail" placeholder="${user.email}" required>
        </div>
        
    </div>
    `)
}