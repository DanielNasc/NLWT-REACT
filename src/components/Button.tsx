import { useState } from "react"

type BananaProps = {
    text?: string,
    children?: number
}

function Button(props: BananaProps){
    return (
        <button>{props.text || props.children || "Hello Button!" }</button>
    )
}

function NumberButton(){
    const [counter, setCounter] = useState(0)

    function increment(){
        setCounter(counter + 1)
    }

    return (
        <button onClick= {increment} >{counter}</button>
    )
}


export {Button, NumberButton}