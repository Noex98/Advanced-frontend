import { Redirect, useState } from '/jk'
import Header from '../../components/Header/Header.js'
import Aside from '../../components/Aside/Aside.js'
import Spinner from '../../components/Spinner/Spinner.js'

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

    function returnTags(video){
        let output = ''
        console.log(video)

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
                <h2>No videos in this playlist</h2>
            `)
        }

        // Playlist is not empty
        for (const id of collection.videos) {   
            let video = videos.find(video => video.id === id)
            console.log(video)

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
                    <div class="video">
                        <div class="video__imgCont">
                            <img src="${video.thumbnail}" alt="" />
                        </div>
                        <div class="video__text">
                            <div class="title">${video.title}</div>
                            <div class="teacher">Underviser: ${video.tags.teachers[0]}</div>
                            <div class="video__tags">
                                ${returnTags(video)}
                            </div>
                        </div>
                    </div>
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