import { useEffect, useState } from "/jk"
import Header from "../../components/Header/Header.js"
import Aside from "../../components/Aside/Aside.js"
import Spinner from "../../components/Spinner/Spinner.js"

export default function Home() {

    // Global state
    const [videos, setVideos] = useState([jk.global, 'videos'], undefined)
    const [filters, setFilters] = useState([jk.global, 'filters'], undefined)

    // Component state
    const [searchOptions, SetSearchOptions] = useState([Home, 'searchOptions'], {

    })

    // Return spinner if assets not loaded
    if (videos === undefined || filters === undefined){
        return (/*html*/`
            ${Header()}
            ${Spinner()}
        `)
    }

    useEffect([Home, 'init'], () => {

        jk.Home = {}

        jk.Home.filterItems = (element) => {
            let key = element.dataset.key
            let value = element.value

            console.log('key: ' + key)
            console.log('value: ' + value)
        }

    }, [])

    function returnFilterMenu(){
        let output = ""

        for (const filter of filters) {
            output += (/*html*/`
                <div class="filters__item dropdown">
                    <div>${filter.displayName}</div>



                </div>
            `)
        }
        return output
    }

    return (/*html*/`
        ${Header()}
        <div class="flex-wrapper">

            ${Aside()}
            <div class="view__home">
                <div class="home__filters">

                    ${returnFilterMenu()}

                </div>

            </div>
            
        </div>
    `)
}