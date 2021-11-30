import { InitRouter } from '/jk'
import routes from './routes.js'
import initFirebase from './global/firebase.js'

InitRouter(routes)
initFirebase()