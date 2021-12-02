import { handleEffects, handleCleanups} from './useEffect.js'

export function InitRouter(routes) {

    let root = document.getElementById('root')  // Root div

    // Render view in the DOM
    function render(options){

        // Handle queued effect cleanups
        handleCleanups()

        // Find view to render
        let target = routes.find(element => element.path === window.location.pathname)

        // No view found -> first route in array used
        if (target === undefined) target = routes[0]

        // Init empty props object
        let props = {}

        // Extract search param data as props
        if (location.search){
            ;(() => {
                let params = {}
                let kv_pairs = location.search.substring(1).split('&')
                for (let i = 0; i < kv_pairs.length; i++){
                    let x = kv_pairs[i].split('=')
                    params = {...params, [x[0]]: x[1]}
                }
                props.search = params
            })()
        }

        document.title = target.title
        root.innerHTML = target.view(props)

        // Prevent default <a> behavior on rendered elements
        ;(() => {
            const navLinks = root.querySelectorAll(".jk-link")
            for (const link of navLinks) {
                link.onclick = (e) => {
                    const path = link.href
                    navigateTo(path)
                    e.preventDefault()
                };
            }
        })()
        
        // Scroll to top
        if (options && options.scroll !== false){
            scrollTo(0, 0)
        }

        // Handle queued effects
        handleEffects()

    }

    // Global navigation function
    window.navigateTo = (path, options) => {
        if (path !== location.pathname){
            window.history.pushState(null, null, path)
        }
        render(options)
    }

    // Navigating with history api
    onpopstate = () => render()

    // First render
    onload = () => {
        // Prevent render triggered on init
        if (!root.innerHTML === ''){
            render()
        }
    }
}