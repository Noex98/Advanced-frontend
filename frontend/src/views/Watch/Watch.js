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
    console.log(_vid[0].title);
 
    
    function returnVideoLayout(){
        let output = (/*html*/`
        <div class="watch__container">
            <div class="container__video">
                <video id="video" poster="${_vid[0].thumbnail}" controls>
                    <source="${_vid[0].url}" type="video/mp4"/>
                </video>
            </div>
            <div class="container__description">
                <div class="description__main">
                    <h1>${_vid[0].title}</h1>
                    <span>${_vid[0].description}</span>
                    <div class="description__tags">
                        <div>${_vid[0].duration}</div>
                        <div>${_vid[0].level}</div>
                        <div>${_vid[0].categories}</div>
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
        ${returnVideoLayout()}
        </div>
        
    </div>
    `)
}