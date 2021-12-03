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
                <img src="" alt="home icon"/>
                <div>Home</div>
            </a>

            <a class="jk-link" href="/settings">
                <img src="" alt="settings icon"/>
                <div>Indstillinger</div>
            </a>

            <a class="jk-link" href="/collection?collection_id=favoritter">
                <img src="" alt="settings icon"/>
                <div>Faoritter</div>
            </a>

            <div class="aside__collections">
                <div>Playlister</div>
                ${returnCollections()}
                <button onclick="jk.Aside.addCollection()">Ny playlist</button>
            </div>

            

        </aside>
    `)

}