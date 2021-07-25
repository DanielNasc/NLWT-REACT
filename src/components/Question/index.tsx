import { ReactNode } from 'react'
import cn from 'classnames'

import './style.scss'

type QuestionProps = {
    content: string,
    author: {
        name: string,
        avatar: string
    },
    isHighlited?: boolean,
    isAnswered?: boolean,
    children?: ReactNode
}

export function Questions({
    content,
    author,
    children,
    isAnswered = false,
    isHighlited = false,}: QuestionProps){
    return (
        <div className={cn("question",
            {answered: isAnswered},
            {highlighted: isHighlited && !isAnswered}
        )}>
            <p> {content} </p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name} />
                    <span> {author.name} </span>
                </div>
                <div>
                    {children}
                </div>
            </footer>
        </div>
    )
}