import { useEffect, useState, Redirect } from "/jk"
import Header from "../../components/Header/Header.js"

export default function Watch(props) {

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
    
    return (/*html*/`
        ${Header()}
        <div class="view__watch">
            Watch view
        </div>
    `)
}