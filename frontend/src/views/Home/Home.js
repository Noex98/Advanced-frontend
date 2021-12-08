import { useEffect, useState } from "/jk"
import Header from "../../components/Header/Header.js"
import Aside from "../../components/Aside/Aside.js"
import Spinner from "../../components/Spinner/Spinner.js"

// Todo 
// Få ændret på vc counter, når der er oploadet mere på db
// Lav en load more function

export default function Home() {

    const emptySearchState = {
        filter: {},
        search: ""
    }

    // Global state
    const [videos, setVideos] = useState([jk.global, 'videos'], undefined)
    const [filters, setFilters] = useState([jk.global, 'filters'], undefined)

    // Component state
    const [searchOptions, SetSearchOptions] = useState([Home, 'searchOptions'], emptySearchState)

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

            SetSearchOptions(prev => {
                let newState = prev
                if (value === 'Alle'){
                    delete newState.filter[key]
                } else {
                    newState.filter[key] = value
                }
                return newState
            }, {reRender: false})
            document.querySelector('.home__videos').innerHTML = returnVideos()
        }

        jk.Home.search = (input) => {
            SetSearchOptions(prev => {
                let newState = prev
                prev.search = input
                return newState
            }, {reRender: false})
            document.querySelector('.home__videos').innerHTML = returnVideos()
        }

    }, [])

    // return html for filter menu
    function returnFilterMenu(){
        let output = ""

        for (const filter of filters) {

            let options = ""
            for (const option of filter.options) {
                options += (/*html*/`
                    <option ${searchOptions.filter[filter.displayName] === option ? 'selected' : ''} value="${option}" >${option}</option>
                `)
            }

            output += (/*html*/`
                <div class="filters__item">
                    <label for="${filter.displayName}">${filter.displayName}</label>
                    <select data-key="${filter.displayName}" onchange="jk.Home.filterItems(this)" id="${filter.displayName}">
                        <option value="Alle">Alle</option>
                        ${options}
                    </select>
                </div>
            `)
        }
        return output
    }

    // Returns true if video fullfills search requirements
    function videoShouldRender(video){

        // Test if 
        for (const filter of filters) {
            if ( searchOptions.filter[filter.displayName] && !video.tags[filter.id].includes(searchOptions.filter[filter.displayName]) ){
                return false
            }
        }

        // Title search
        if ( searchOptions.search.length > 0 && !video.title.toLowerCase().includes(searchOptions.search.toLowerCase()) ){
            return false
        } 

        // All tests passed
        return true
    }
    
    // returns html for videos
    function returnVideos(){

        // vc: video counter
        // Counting how how many videos is rendered in the dom
        let vc = 0;

        // Empty search state
        if (Object.keys(searchOptions.filter).length === 0 && searchOptions.search === "" ){

            let newVideos = ''
            for (vc; vc < 2; vc++){
                newVideos += (/*html*/`
                    <a onclick="event.preventDefault(); window.navigateTo('/watch?video_id=${videos[vc].id}')">
                        <div class="video video--new">
                            <img src="${videos[vc].thumbnail}" alt="" />
                            <div class="video__text">
                                <div>
                                    <div class="text__title">
                                        ${videos[vc].title}
                                    </div>
                                    <div class="text__teacher">
                                        ${videos[vc].tags.teachers[0]}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                `)
            }

            let allVideos = ''
            for (vc; vc < 3; vc++){
                allVideos += (/*html*/`
                    <a onclick="event.preventDefault(); window.navigateTo('/watch?video_id=${videos[vc].id}')">
                        <div class="video">
                            <img src="${videos[vc].thumbnail}" alt="video thumbnail" />
                            <div class="video__text">
                                <div class="text__title">
                                    ${videos[vc].title}
                                </div>
                            </div>
                        </div>
                    </a>
                `)
            }

            return (/*html*/`
                <h2>Netop tilføjet</h2>
                <div class="videos__new">
                    ${newVideos}
                </div>

                <h2>Udforsk</h2>
                <div class="videos__all">
                    ${allVideos}
                </div>
            `)
            
        // Search active
        } else {

            let videoHTML = ''

            for (vc; vc < 3; vc++){
                if (videoShouldRender(videos[vc])){
                    videoHTML += (/*html*/` 
                        <a onclick="event.preventDefault(); window.navigateTo('/watch?video_id=${videos[vc].id}')">
                            <div class="video">
                                <img src="${videos[vc].thumbnail}" alt="video thumbnail" />
                                <div class="video__text">
                                    <div class="text__title">
                                        ${videos[vc].title}
                                    </div>
                                </div>
                            </div>
                        </a>
                    `)
                }
            }

            if (videoHTML === ''){
                return (/*html*/`
                    <h2>Ingen resultater</h2>
                `)
            } else {
                return (/*html*/`
                    <h2>some search query</h2>
                    <div class="videos__all">
                        ${videoHTML}
                    </div>
                `)
            }
        }
    }

    return (/*html*/`
        ${Header()}
        <div class="flex-wrapper">

            ${Aside()}
            <div class="view__home">
                <div class="home__filters">
                    ${returnFilterMenu()}
                    <div id="search__input"><input type="text" value="${searchOptions.search}" oninput="jk.Home.search(this.value)" placeholder="Søg"/></div>
                </div>
                <div class="home__videos">
                    ${returnVideos()}
                </div>
            </div>
        </div>
    `)
}