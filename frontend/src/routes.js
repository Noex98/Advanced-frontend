// Views
import Home from './views/Home/Home.js'
import Err from './views/Err/Err.js'
import Watch from './views/Watch/Watch.js'
import Login from './views/Login/Login.js'
import Settings from './views/Settings/Settings.js'
import Collection from './views/Collection/Collection.js'

const routes = [
    {
        path: 'error',
        view: Err,
        title: 'Error'
    },
    {
        path: '/',
        view: Home,
        title: 'Home'
    },
    {
        path: '/watch',
        view: Watch,
        title: 'Watch'
    }, {
        path: '/login',
        view: Login,
        title: 'Login'
    }, {
        path: '/settings',
        view: Settings,
        title: 'Settings'
    }, {
        path: '/collection',
        view: Collection,
        title: 'Collection'
    }
]

export default routes