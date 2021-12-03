import { Redirect } from '/jk'
import Header from '../../components/Header/Header.js'
import Aside from '../../components/Aside/Aside.js'

export default function Collection(props){

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

    return (/*html*/`
    ${Header()}
    <div class="flex-wrapper">

        ${Aside()}
        <div class="view__collection">Collection</div>
        
    </div>
    `)
}