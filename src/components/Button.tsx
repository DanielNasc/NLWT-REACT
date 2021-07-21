import {ButtonHTMLAttributes} from 'react'
import '../styles/button.scss'

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement>

function Button (props: BtnProps){
    return(
        <button className="button" {...props}>

        </button>
    )
}

export {Button}