import Header from "../../components/Header/Header.js"
import Aside from "../../components/Aside/Aside.js"

export default function Err(props) {

    return (/*html*/`
        ${Header()}
        <div class="flex-wrapper">
            ${Aside()}
            <div class="view__err">
                <div>404 error</div>
            </div>
        </div>
    `)
}