import { useEffect, useState, Redirect } from "/jk"
import Header from "../../components/Header/Header.js"
import Aside from "../../components/Aside/Aside.js"
import modCollections from "../../functions/modCollections.js"

export default function Watch(props) {

    // Global state
    const [videos, setVideos] = useState([jk.global, 'videos'], undefined)
    const [user, setUser] = useState([jk.global, 'user'], undefined)
    // id for video
    let video_id

    // Make sure we have a video id
    try {
        video_id = props.search.video_id
    } catch {
        Redirect('/')
        return
    } finally {
        if (video_id === undefined) {
            Redirect('/')
            return
        }
    }

    // Object of clicked video db values
    let _vid = videos.find(x => x.id === video_id)

    let _tags = _vid.tags.categories

    useEffect([Watch, 'init'], () => {

        jk.Watch = {}
    
        jk.Watch.favourite = (id) => {

            // Logged in
            if (user){ 
                let newData = user.collections
                
                // Delete from fav
                if (user.collections[0].videos.includes(id)){
                    let target = newData[0].videos.indexOf(id)
                    if (target !== -1) {
                        newData[0].videos.splice(target, 1);
                    }
                } else { // Add to fav
                    newData[0].videos.unshift(id)
                }

                modCollections(newData, (() => {
                    setUser(prev => {
                        let newState = prev;
                        newState.collections = newData
                        return newState;
                    }, {reRender: false})
                    document.getElementById('likeBtn').classList.toggle('liked')
                }))

            } else { // Not logged in
                alert('Sign up to use this feature')
            }
        }

    }, [ user ])

    //Return tags to html 
    function returnTags(){
        let output = ""
        for (let tag of _tags) {
            output += (/*html*/`
                <div>${tag}</div>
            `)
        }
        return output
    }

    function appendSimilarVideos() {
        let _similarVideos = []
        let output = ""
        // Loop through videos and different tags of those videos
        for (let video of videos) {
            let categories = video.tags.categories
            for (const x of categories) {
                // Check if tags are in common
                const found = _tags.includes(x);
                // If tags are in common push to array
                if(found == true){
                   _similarVideos.push(video)
                }
            }
        }
        // Remove duplicates
        let uniq = [...new Set(_similarVideos)];

        // Remove the opened video
        let filteredUniq = uniq.filter(x => x.id !== video_id)

        // Loop through unique videos and append them to HTML
        for (const video of filteredUniq) {
            function returnCategories() {
                let categoriesOutput= ""
                let categories = video.tags.categories
                for (const category of categories) {
                    categoriesOutput +=(/*html*/`
                    <div>${category}</div>
                    `)
                }
                return categoriesOutput
            }
            output += (/*html*/`
                <a onclick="event.preventDefault(); window.navigateTo('/watch?video_id=${video.id}')">
                    <div class="video">
                        <img src="${video.thumbnail}" alt="video thumbnail" />
                        <div class="video__text">
                            <div class="text__title">
                                ${video.title}
                            </div>
                            <div class="text__tags">
                            <div>${video.tags.duration}</div>
                            <div>${video.tags.level}</div>
                            </div>
                            <div class="text__tags">
                            ${returnCategories()}
                            </div>
                        
                        </div>
                    </div>
                </a>
            `)
        }
        return output
    }

    function checkIfLiked(){
        try {
            if (user.collections[0].videos.includes(_vid[0].id)){
                return 'liked'
            } else { return '' }
        } catch { return '' }
    }

    return (/*html*/`
        ${Header()}
        <div class="flex-wrapper">
            ${Aside()}
            <div class="view__watch">
                <div class="watch__container">
                    <div class="container__video">
                        <video id="video" poster="${_vid.thumbnail}" controls>
                            <source src="${_vid.url}" type="video/mp4"/>
                        </video>
                    </div>
                    <div class="container__description">
                        <div class="description__main">
                            <h1>${_vid.title}</h1>
                            <span>${_vid.description}</span>
                            <div class="description__tags">
                                <div>${_vid.tags.duration}</div>
                                <div>${_vid.tags.level}</div> 
                                ${returnTags()}
                            </div>
                        </div>
                        <div class="playlist__buttons">
                            <img 
                                onclick="jk.Watch.favourite('${_vid.id}')" 
                                src="/media/icons/Addtofavorites.svg" 
                                alt="addfavorite icon"
                                class="${checkIfLiked()}"
                                id="likeBtn"
                            />
                            <img src="/media/icons/Addtoplaylist.svg" alt="addplaylist icon"/>
                        </div>
                    </div>
                </div>
                <div class="similarVids">
                    <h1>Relaterede videoer</h1>
                    <div class="videos__all">
                        ${appendSimilarVideos()}
                    </div>
                </div>
            </div>
            
        </div>
    `)
}