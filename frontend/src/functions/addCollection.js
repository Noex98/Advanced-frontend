export default function addCollection(video_id){
    // Darken background
    document.getElementById('aside__darken').classList.add('darken--active')

    let popup = document.createElement('div')

    popup.classList.add('popup')

    popup.innerHTML = (/*html*/`
        <div class="popup__close"></div>
    `)

    document.getElementById('root').appendChild(popup)

}