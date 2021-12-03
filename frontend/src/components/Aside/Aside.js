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
            alert('Add collection')
        }

    }, [])

    console.log(user)

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
        <aside>

            <a class="jk-link" href="/">
                <img src="/media/icons/Home.svg" alt="home icon"/>
                <div>Home</div>
            </a>

            <a class="jk-link" href="/settings">
                <img src="/media/icons/Settings.svg" alt="settings icon"/>
                <div>Indstillinger</div>
            </a>

            <a class="jk-link" href="/collection?collection_id=favoritter">
                <img src="/media/icons/Favorites.svg" alt="settings icon"/>
                <div>Favoritter</div>
            </a>

            <a>
                <img src="/media/icons/Collection.svg" alt="settings icon"/>
                <div>Playlister</div>
            </a>

            ${returnCollections()}
            <button onclick="jk.Aside.addCollection()">Ny playlist</button>

            

        </aside>
    `)

}