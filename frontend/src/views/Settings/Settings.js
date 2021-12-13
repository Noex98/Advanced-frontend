import { useEffect, useState, Redirect } from "/jk"
import Header from "../../components/Header/Header.js"
import Aside from "../../components/Aside/Aside.js"
export default function Settings(props) {

    const [user, setUser] = useState([jk.global, 'user'], undefined)
    
    return (/*html*/`
    ${Header()}
    <div class="flex-wrapper">

        ${Aside()}
        <div class="view__settings">
            <div class="settings__header">
                <h1>Indstillinger</h1>
                <h1>${user.displayName}</h1></div>
            <div>
            <div class="settings__main">
                <div class="main__container">
                <h3>Kontooplysninger</h3>
                <form>
                    <input type="text" id="name" placeholder="${user.displayName}" required>
                    <input type="text" id="mail" placeholder="${user.email}" required>
                    <input type="text" id="name" placeholder="Password" required>
                </form>
                <h3>Kortoplysninger</h3>
                <form>
                    <input type="text" id="name" placeholder="**** **** **** 0437" required>
                    <div id="form__card">
                    <input type="text" id="mail" placeholder="** / **" required>
                    <input type="text" id="name" placeholder="***" required>
                    </div>
                </form>
                </div>
                <div class="main__container">
                    <h3>Abonnement</h3>
                    <div id="container__background">
                        <div class="box__upper">
                        <h1 style="color:white">${user.subscription.lastPayment} dkk</h1>
                        <h3 style="color:white">${user.subscription.subscriptionType}</h3>
                        </div>
                        <div class="box__lower">
                        <button class="unsub">Afmeld</button></a>
                        <button class="change">Skift</button></a>
                        </div>
                    </div>
                    <div>
                    <button id="save__button">Gem</button>
                    </div>
                </div>
        </div>
    </div>
    `)
}