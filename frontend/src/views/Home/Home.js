import { useEffect, useState } from "/jk"
import Header from "../../components/Header/Header.js"
import Aside from "../../components/Aside/Aside.js"
import Spinner from "../../components/Spinner/Spinner.js"

export default function Home() {

    const [videos, setVideos] = useState([jk.global, 'videos'], undefined)

    // Return spinner if video list is not downloaded
    if (videos === undefined){
        return (/*html*/`
            ${Header()}
            ${Spinner()}
        `)
    }

    useEffect([Home, 'init'], () => {

        jk.Home = {}

    }, [])

    return (/*html*/`
        ${Header()}
        <div class="wrap">
            ${Aside()}
            <div>Home</div>
        </div>
    `)
}