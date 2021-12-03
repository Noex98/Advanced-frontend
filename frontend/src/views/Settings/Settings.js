import { useEffect, useState, Redirect } from "/jk"
import Header from "../../components/Header/Header.js"
import Aside from "../../components/Aside/Aside.js"

export default function Settings(props) {

    
    
    return (/*html*/`
    ${Header()}
    <div class="flex-wrapper">

        ${Aside()}
        <div class="view__settings">Settings</div>
        
    </div>
    `)
}