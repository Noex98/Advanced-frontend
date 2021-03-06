import { Redirect, useState, useEffect } from '/jk'
import Header from '../../components/Header/Header.js'
import Aside from '../../components/Aside/Aside.js'
import Spinner from '../../components/Spinner/Spinner.js'
import modCollections from '../../functions/modCollections.js'



export default function Collection(props){

     // Global state
     const [videos, setVideos] = useState([jk.global, 'videos'], undefined)
     const [user, setUser] = useState([jk.global, 'user'], undefined)
 
     // Return spinner if assets not loaded
     if (videos === undefined || user === undefined){
        return (/*html*/`
            ${Header()}
            <div class="flex-wrapper">
            ${Aside()}
            <main></main>
            </div>
            ${Spinner()}
        `)
    }

    // id for video
    let collection_id

    // Make sure we have a collection id
    try {
        collection_id = props.search.collection_id
    } catch {
        Redirect('/')
        return
    } finally {
        if (collection_id === undefined) {
            Redirect('/')
            return
        }
    }

    // get an array of the videos in the playlist
    let collection = user.collections.find(collection => collection.name === collection_id)

    useEffect([Collection, 'init'], () => {
        jk.Collection = {}

        jk.Collection.showOptions = (event, element) => {
            event.stopPropagation(); 
            event.preventDefault() 

            let target = element.querySelector('.dots__options')
            let opentabs = document.querySelectorAll('.dots__options--active')

            for (const tab of opentabs){
                if (tab !== target){    
                    tab.classList.remove('dots__options--active')
                }
            }

            target.classList.toggle('dots__options--active')
        }

        jk.Collection.delete = video => {

            // Update collections
            let updatedCollections = user.collections.map(x => {
                // Modify current collection
                if (x === collection){
                    let target = x.videos.indexOf(video)
                    if (target !== -1) {
                        x.videos.splice(target, 1);
                    }
                }
                return x
            })

            modCollections(updatedCollections, (() => setUser(prev => {
                let newState = prev;
                newState.collections = updatedCollections
                return newState;
            })))
        }
        
        jk.Collection.move = (index, direction) => {

            // Stop 1st item from moving up, and last from moving down
            if ( (index === 0 && direction === -1) || (index === user.collections.length - 1 && direction === 1) ){
                return
            }

            // Modify data
            let videos = collection.videos

            let b = videos[index];
            videos[index] = videos[index + direction];
            videos[index + direction] = b;

            // Insert new data into collections
            let updatedCollections = user.collections.map(x => {
                if (x === collection){
                    x.videos = videos
                }
                return x
            })

            modCollections(updatedCollections, (() => setUser(prev => {
                let newState = prev;
                newState.collections = updatedCollections
                return newState;
            })))
        }
        

    }, [])


    function returnTags(video){
        let output = ''

        if (video.tags.level != ''){
            output +=(/*html*/`
                <div>${video.tags.level}</div>
            `)
        }
        if (video.tags.duration != ''){
            output +=(/*html*/`
                <div>${video.tags.duration}</div>
            `)
        }
        if (video.tags.categories[0] != ''){
            output +=(/*html*/`
                <div>${video.tags.categories[0]}</div>
            `)
        }

        return output
    }

    function returnVideos(){
        let output = ''

        // Playlist is empty
        if (collection.videos.length === 0){
            return (/*html*/`
                <h2>Du har ingen videoer i ${collection.name}</h2>
            `)
        }

        // Playlist is not empty
        for (const [i, id] of collection.videos.entries()) {   
            let video = videos.find(video => video.id === id)

            // Video not found
            if (video === undefined){
                output += (/*html*/`
                    <div class="video">
                        <div>Video not found</div>
                    </div>
                `)
            // Video found
            } else {
                output += (/*html*/`
                    <a onclick="event.preventDefault(); window.navigateTo('/watch?video_id=${video.id}')">
                        <div class="video">
                            <div class="video__imgCont">
                                <img src="${video.thumbnail}" />
                            </div>
                            <div class="video__text">
                                <div class="title">${video.title}</div>
                                <div class="teacher">Underviser: ${video.tags.teachers[0]}</div>
                                <div class="video__tags">
                                    ${returnTags(video)}
                                </div>
                            </div>
                            <div class="video__dots" onclick="jk.Collection.showOptions(event, this)">
                                <div class="dot"></div>
                                <div class="dot"></div>
                                <div class="dot"></div>

                                <div class="dots__options">
                                    <div onclick="jk.Collection.delete('${video.id}')">
                                        <img src="/media/icons/trashcan.svg" alt="ic" />
                                        <div>Fjern fra ${collection_id}</div>
                                    </div>
                                    <div onclick="jk.Collection.move(${i}, -1)">
                                        <img  src="/media/icons/up-arrow.svg" alt="icon" />
                                        <div>Flyt op</div>
                                    </div>
                                    <div onclick="jk.Collection.move(${i}, 1)">
                                        <img src="/media/icons/down-arrow.svg" alt="icon" />
                                        <div>Flyt ned</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                `)
            }
        }
        return output
    }


    return (/*html*/`
        ${Header()}
        <div class="flex-wrapper">
            ${Aside()}
            <div class="view__collection">
                <h2>${collection_id}</h2>
            
                <div class="collection__videos">
                    ${returnVideos()}
                <div>
        
            </div>
        </div>
    `)
}