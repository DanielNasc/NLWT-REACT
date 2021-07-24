import { useEffect, useState } from "react"
import { database } from "../services/firebase"
import { useAuth } from "./useAuth"

type QuestionsType = {
    id: string,
    author: {
        name: string,
        avatar: string
    },
    content: string,
    isHighlited: boolean,
    isAnswered: boolean,
    likeCount: number,
    likeId: string | undefined
}


type firebaseQuestion= Record<string, {
    author: {
        name: string,
        avatar: string
    },
    content: string,
    isHighlited: boolean,
    isAnswered: boolean,
    likes: Record<string, {authorId: string}>
}>

export function useRoom(roomId: string){
    const {user} = useAuth()
    const [questions, Setquestions] = useState<QuestionsType[]>([])
    const [title, SetTitle] = useState('')

    
    useEffect(()=>{
        const roomRef = database.ref(`rooms/${roomId}`)

        roomRef.on('value', room=>{
            const databaseRoom = room.val()
            const questions: firebaseQuestion = databaseRoom.questions ?? {}

            const parsedQuestions = Object.entries(questions).map(([key, value]) => {
                const likes = Object.values(value.likes ?? {})

                return {
                    id: key,
                    author: value.author,
                    content: value.content,
                    isHighlited: value.isHighlited,
                    isAnswered: value.isAnswered,
                    likeCount: likes.length,
                    likeId: Object.entries(value.likes ?? {})
                    .find(([key, like]) => like.authorId === user?.id)?.[0]
                }
            })

            SetTitle(databaseRoom.title)
            Setquestions(parsedQuestions)

            return ()=>{roomRef.off('value')}

        })
    },[roomId, user?.id])

    return {title, questions}
}