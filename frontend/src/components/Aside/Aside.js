import { useEffect, useState, reRender } from "/jk"

import {
	doc,
	updateDoc,
    arrayUnion
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js";


export default function Aside(){
    const [user, setUser] = useState([jk.global, 'user'], undefined)

    // No aside if not logged in
    if (user === undefined){
        return ''
    }

    useEffect([Aside, 'init'], () => {

        jk.Aside = {}

        jk.Aside.closePopup = () => {
            document.getElementById('aside__darken').classList.remove('darken--active')
            document.querySelector('.popup').remove()
        }

        jk.Aside.saveCollection = () => {
            const input = document.getElementById('asidePlaylistInput').value

            let newCollection = {
                name: input,
                videos: []
            }
            
            updateDoc(doc(jk.global.db, 'users', user.uid), {
                collections: arrayUnion(newCollection)
            })
                .then(
                    setUser(prev => {
                        let newState = prev
                        newState.collections.push(newCollection)
                        return newState
                    })
                )
        }

        // Add collection
        jk.Aside.addCollection = () => {
            
            // Darken background
            document.getElementById('aside__darken').classList.add('darken--active')

            let popup = document.createElement('div')
            popup.classList.add('popup')

            popup.innerHTML = (/*html*/`
                <div onclick="jk.Aside.closePopup()" class="popup__close"></div>
                <div>Opret playliste</div>
                <input id="asidePlaylistInput" type="text" placeholder="Titel" />
                <button onclick="jk.Aside.saveCollection()" >Gem</button>
            `)

            document.getElementById('root').appendChild(popup)

        }

    }, [])

    function returnCollections(){
        let output = ''

        for (let i = 1; i < user.collections.length; i++){
            output += (/*html*/`
                <a class="jk-link" href="/collection?collection_id=${user.collections[i].name.toLowerCase()}">
                    <div>
                        ${user.collections[i].name}
                    </div>
                </a>
            `)
        }

        return output
    }

    return (/*html*/`
        
        <div id="aside__darken" class="darken"></div>
    
        <aside>
            
            <a class="jk-link aside__icon" href="/">
                <img src="/media/icons/Home.svg" alt="home icon"/>
                <div>Home</div>
            </a>

            <a class="jk-link aside__icon" href="/settings">
                <img src="/media/icons/Settings.svg" alt="settings icon"/>
                <div>Indstillinger</div>
            </a>

            <a class="jk-link aside__icon" href="/collection?collection_id=favoritter">
                <img src="/media/icons/Favorites.svg" alt="settings icon"/>
                <div>Favoritter</div>
            </a>

            <div>

                <div class="aside__icon">
                    <img src="/media/icons/Collection.svg" alt="settings icon"/>
                    <div>Playlister</div>
                </div>
                <div class="aside__collections">
                    ${returnCollections()}
                    <div class="collections__addBtn" onclick="jk.Aside.addCollection()">+ Ny playlist</div>
                </div>
            </div>
            
            

            

        </aside>
    `)

}