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

  

    function returnRelated(){
        
        console.log(_similarVideos);    
        let output = ""
        for (let video of _similarVideos) {
            output += (/*html*/`
            <a onclick="event.preventDefault(); window.navigateTo('/watch?video_id=${video.id}')">
            <div class="video">
                <img src="${video.thumbnail}" alt="video thumbnail" />
                <div class="video__text">
                    <div class="text__title">
                        ${video.title}
                    </div>
                </div>
            </div>
        </a>
        `)
    }
        return output
    }


    let _similarVideos = videos.filter(x => x.tags.categories == "" + _tags);
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

    return (/*html*/`
    ${Header()}
    <div class="flex-wrapper">

        ${Aside()}
        <div class="view__watch">
        ${returnVideo()}
        Similar
        <div class="videosRelated">
        ${returnRelated()}
        </div>
        </div>
        
    </div>
    `)
}