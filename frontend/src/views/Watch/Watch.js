import { useEffect, useState, Redirect } from "/jk"
import Header from "../../components/Header/Header.js"
import Aside from "../../components/Aside/Aside.js"

export default function Watch(props) {

    // Global state
    const [videos, setVideos] = useState([jk.global, 'videos'], undefined)

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
    let _vid = videos.filter(x => x.id === video_id)

    // Filter for videos with the same category 
    let _tags = _vid[0].tags.categories;

    useEffect([Watch, 'init'], () => {
        jk.Watch = {}


    }, [])

    

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

    // Return video to html
    function returnVideo(){
        let output = (/*html*/`
            <div class="watch__container">
                <div class="container__video">
                    <video id="video" poster="${_vid[0].thumbnail}" controls>
                        <source src="${_vid[0].url}" type="video/mp4"/>
                    </video>
                </div>
                <div class="container__description">
                    <div class="description__main">
                        <h1>${_vid[0].title}</h1>
                        <span>${_vid[0].description}</span>
                        <div class="description__tags">
                            <div>${_vid[0].tags.duration}</div>
                            <div>${_vid[0].tags.level}</div>
                            ${returnTags()}
                        </div>
                    </div>
                    <div class="playlist__buttons">
                        <a class="jk-link aside__icon" href="/collection?collection_id=Favoritter">
                            <img src="/media/icons/Addtofavorites.svg" alt="addfavorite icon"/>
                        </a>
                        <img src="/media/icons/Addtoplaylist.svg" alt="addplaylist icon"/>
                    </div>
                </div>
    
            </div>
        `)
        return output
    }

    function appendSimilarVideos() {
        let _similarVideos = []
        let output = ""
        // Loop through videos and categories of those videos
        for (const video of videos) {
            let tags = video.tags.categories
            for (const tag of tags) {
                // Check if tags are in common
                const found = _tags.includes(tag);
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
        console.log(filteredUniq);
        // Loop through unique videos and append them to HTML
        for (const video of filteredUniq) {
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
                    </div>
                </div>
            </a>
            `)
        }
        return output
    }

    return (/*html*/`
        ${Header()}
        <div class="flex-wrapper">
            ${Aside()}
            <div class="view__watch">
                ${returnVideo()}
                <h1>Relateret videoer</h1>
                <div class="videos__all">
                    ${appendSimilarVideos()}
                </div>
            </div>
            
        </div>
    `)
}