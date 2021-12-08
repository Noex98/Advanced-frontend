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
        <div className="watch__container">
            <div className="container__video">
                <video poster="${_vid[0].thumbnail}" controls>
                    <source src="${_vid[0].url}" type="video/mp4"/>
                </video>
            </div>
            <div className="container__description">
                <h1>${_vid[0].title}</h1>
                <span>${_vid[0].description}</span>
                <div class="description__tags">
                    <div>${_vid[0].duration}</div>
                    <div>${_vid[0].level}</div>
                    <div>${_vid[0].categories}</div>
                </div>
                <div className="playlist__buttons">
                <a href="">favorit</a>
                <a href="">playlist</a>
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