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
            ${Aside()}
            ${Spinner()}
        `)
    }

    useEffect([Home, 'init'], () => {

        jk.Home = {}

        jk.Home.filterItems = (element) => {
            let key = element.dataset.key
            let value = element.value
            // Reset vc counters
            vcInit()

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
            // Reset vc counters
            vcInit()

            SetSearchOptions(prev => {
                let newState = prev
                prev.search = input
                return newState
            }, {reRender: false})
            document.querySelector('.home__videos').innerHTML = returnVideos()
        }

    }, [])

    useEffect([Home, 'scrollObserver'], () => {

        addEventListener('scroll', loadMore)

        return () => {
            removeEventListener('scroll', loadMore)
        }
    })

    let vc          // vc: video counter
    let vc_prev     // vc previous: previous vc value, as vc counts up
    let vc_load     // vc load: how many videos showed on render
    let vc_incr     // vc increment: how much more is showed on scroll

    function vcInit(){
        vc = 0;     
        vc_prev = 0 
        vc_load = 5 
        vc_incr = 6 
    }
    vcInit()

    function loadMore(){
        
        let scrollHeight = document.body.scrollHeight;
        let totalHeight = window.scrollY + window.innerHeight;
        let buffer = 300 // px

        let endReachedMsg = (/*html*/`
            <h2 class="endMessage">Ingen yderligere resultater</h2>
        `)

        
    
        if(totalHeight + buffer >= scrollHeight){

            if (document.querySelector('.videos__all .endMessage')) return

            let output = ''

            for (vc; vc < vc_load + vc_incr; vc++){
                
                try {
                    if (videoShouldRender(videos[vc])){
                        output += (/*html*/` 
                            <a class="video" onclick="event.preventDefault(); window.navigateTo('/watch?video_id=${videos[vc].id}')">
                                    <img src="${videos[vc].thumbnail}" alt="video thumbnail" />
                                <div class="video__text">
                                    <div class="text__title">
                                        ${videos[vc].title}
                                    </div>
                                    <div class="text__tags">
                                        <div>${videos[vc].tags.duration}</div>
                                        <div>${videos[vc].tags.level}</div>
                                    </div>
                                </div>
                            </a>
                        `)
                    } else { vc_load++ }
                } catch { break }
            }

            // update vc prev
            vc_prev = vc

            if (output === ''){
                output = endReachedMsg
            }

            document.querySelector('.videos__all').innerHTML += output
        }
    }

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

        // Empty search state
        if (Object.keys(searchOptions.filter).length === 0 && searchOptions.search === "" ){

            let newVideos = ''
            for (vc; vc < 2; vc++){
                newVideos += (/*html*/`
                    <a class="video video--new" onclick="event.preventDefault(); window.navigateTo('/watch?video_id=${videos[vc].id}')">
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
                            <div class="text__tags">
                                <div>${videos[vc].tags.duration}</div>
                                <div>${videos[vc].tags.level}</div>
                            </div>
                        </div>
                    </a>
                `)
            }

            let allVideos = ''
            for (vc; vc < vc_load; vc++){
                allVideos += (/*html*/`
                    <a class="video" onclick="event.preventDefault(); window.navigateTo('/watch?video_id=${videos[vc].id}')">
                            <img src="${videos[vc].thumbnail}" alt="video thumbnail" />
                        <div class="video__text">
                            <div class="text__title">
                                ${videos[vc].title}
                            </div>
                            <div class="text__tags">
                                <div>${videos[vc].tags.duration}</div>
                                <div>${videos[vc].tags.level}</div>
                            </div>
                        </div>
                    </a>
                `)
            }

            // update vc prev
            vc_prev = vc

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

            for (vc; vc < vc_load; vc++){
                
                try {
                    if (videoShouldRender(videos[vc])){
                        videoHTML += (/*html*/` 
                            <a class="video" onclick="event.preventDefault(); window.navigateTo('/watch?video_id=${videos[vc].id}')">
                                    <img src="${videos[vc].thumbnail}" alt="video thumbnail" />
                                <div class="video__text">
                                    <div class="text__title">
                                        ${videos[vc].title}
                                    </div>
                                    <div class="text__tags">
                                        <div>${videos[vc].tags.duration}</div>
                                        <div>${videos[vc].tags.level}</div>
                                    </div>
                                </div>
                            </a>
                        `)
                    } else { vc_load++ }
                } catch { break }
            }

            // update vc prev
            vc_prev = vc

            if (videoHTML === ''){
                return (/*html*/`
                    <h2>Ingen resultater</h2>
                `)
            } else {
                return (/*html*/`
                    <h2>Resultater</h2>
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