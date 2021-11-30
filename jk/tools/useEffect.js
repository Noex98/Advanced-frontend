let effects = []
let cleanups = []

// Set lifecycle hooks
export function useEffect(storage, func, dependencies){

    // First time any effect is used on object
    if ('effects' in storage[0] === false) storage[0].effects = {}

    // First time specific effect is used
    if (storage[1] in storage[0].effects === false){
        if (dependencies) storage[0].effects[storage[1]] = dependencies
        effects.push(func)
    // Effect has been used before check if for dependency change
    } else if (dependencies){
        if (!arrayEquals(storage[0].effects[storage[1]], dependencies)){
            storage[0].effects[storage[1]] = dependencies
            effects.push(func)
        }
    }
}


// Export handlers for router

export function handleEffects(){
    if (effects.length > 0){
        for (const effect of effects){

            // Cleanup returns from effect
            let cleanup = effect()

            // If cleanup was returned, add to queue
            if (typeof(cleanup) === 'function') cleanups.push(cleanup)
        }
        effects = []
    }
}

export function handleCleanups(){
    if (cleanups.length > 0){
        for (const cleanup of cleanups){
            cleanup()
        }
        cleanups = []
    }
}


// Check if arrays are equals
function arrayEquals(a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}