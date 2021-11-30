import { useEffect } from "/jk"

export default function Header(){

    useEffect([Header, 'init'], () => {

        console.log('header effect')
        
    }, [])

    return (/*html*/`
        <header>
            Header
        </header>
    `)
}