export function Redirect(path){
    history.replaceState(null, null, path)
    setTimeout(() => navigateTo(path), 0)
}