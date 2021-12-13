import { InitRouter } from '/jk'
import routes from './routes.js'
import initFirebase from './functions/initFirebase.js'

InitRouter(routes)
initFirebase()