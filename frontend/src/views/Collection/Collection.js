import { Redirect } from '/jk'

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
        Collection view
    `)
}