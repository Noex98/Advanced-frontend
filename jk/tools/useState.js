import { reRender } from "/jk"


class state {
    constructor (initState){
        this.currentState = initState
    }
    get state(){
        return this.currentState
    }

    set state(newState){
        this.currentState = newState
    }

    getState = () => {
        return this.state
    }

    setState = (newState, options) => {
        if (typeof(newState) === 'function'){
            this.state = newState(this.state)
        } else {
            if (this.state != newState){
                this.state = newState
            }
        }

        // Rerender efter state change, unless specified in options
        if (options && options.reRender === false){
            return
        } else {
            reRender()
        }
    }
}

export function useState(storage, initState){

    // If no states has been used, create a state object
    if ('state' in storage[0] === false) storage[0].state = {}

    // If state has no been set, set state with initial values
    if (storage[1] in storage[0].state === false){
        storage[0].state[storage[1]] = new state(initState)
    }

    // Return [state, setState]
    return [storage[0].state[storage[1]].getState(), storage[0].state[storage[1]].setState]
}