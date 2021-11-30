import { useEffect, useState } from "/jk"
import Header from "../../components/Header/Header.js"
import Spinner from "../../components/Spinner/Spinner.js"

export default function Home() {

    const [num, setNum] = useState([Home, 'num'], 0)
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

        jk.Home.incrementNum = () => {
            setNum(prev => prev + 1)
        }

    }, [])

    return (/*html*/`
        ${Header()}
        Home <br>
        <button onclick="jk.Home.incrementNum()">Increment number</button>
        State: ${num}
    `)
}