import { useEffect, useState } from "/jk"

export default function Aside(){
    const [loggedin, setLoggedin] = useState([jk.global, 'loggedin'], false)

    // No aside if not logged in
    if (loggedin === false){
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

        // for loop here

        return output
    }

    return (/*html*/`
        <aside>

            <div class="aside__collections">
                <a href="/collection?collection_id=0" class="jk.link">
                    Favoritter
                </a>
                ${returnCollections()}
                <button onclick="jk.Aside.addCollection()">Ny samling</button>
            </div>

            <div class="aside__categories">
                <ul>
                    <li>
                        Category
                    </li>
                    <li>
                        Category
                    </li>
                    <li>
                        Category
                    </li>
                    <li>
                        Category
                    </li>
                </ul>
            </div>

        </aside>
    `)

}