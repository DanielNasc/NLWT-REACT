import {ButtonHTMLAttributes} from 'react'
import '../styles/button.scss'

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean;
}

function Button ({ isOutlined = false ,...props}: BtnProps){
    return(
        <button 
        className= {`button ${isOutlined ? 'outlined' : "" }`}
        {...props}>

        </button>
    )
}

export {Button}