import { useEffect, useState } from "/jk"

export default function Aside(){
    const [user, setUser] = useState([jk.global, 'user'], undefined)

    // No aside if not logged in
    if (user === undefined){
        return ''
    }

    useEffect([Aside, 'init'], () => {

        jk.Aside = {}

        // Add collection
        jk.Aside.addCollection = () => {
            // Darken background
            document.getElementById('aside__darken').classList.add('darken--active')
            

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
                    <div class="collections__addBtn" onclick="jk.Aside.addCollection()">+ Ny playlist</div>
                    ${returnCollections()}
                </div>
            </div>
            
            

            

        </aside>
    `)

}