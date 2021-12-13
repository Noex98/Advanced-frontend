import { useState } from '/jk'

import {
	doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js";

export default function modCollections(newData, cb){

    const [user, setUser] = useState([jk.global, 'user'], undefined)

    updateDoc(doc(jk.global.db, 'users', user.uid), {
        collections: newData
    })
        .then(() => {
            cb()
        })
}