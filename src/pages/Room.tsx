import { FormEvent, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '../components/Button' 
import { RoomCode } from '../components/Room-code'
import { useAuth } from '../hooks/useAuth'

import logoImg from '../assets/images/logo.svg'
import '../styles/room.scss'
import { database } from '../services/firebase'
import { useEffect } from 'react'

type RoomParamsType = {
    id: string
}

type firebaseQuestion= Record<string, {
    author: {
        name: string,
        avatar: string
    },
    content: string,
    isHighlited: boolean,
    isAnswered: boolean
}>

type Question = {
    id: string,
    author: {
        name: string,
        avatar: string
    },
    content: string,
    isHighlited: boolean,
    isAnswered: boolean
}

export function Room(){
    const {user} = useAuth()

    const params = useParams<RoomParamsType>()
    const roomId = params.id

    const [NewQuestion, SetNewQuestion] = useState('')
    const [questions, Setquestions] = useState<Question[]>([])
    const [title, SetTitle] = useState('')

    useEffect(()=>{
        const roomRef = database.ref(`rooms/${roomId}`)

        roomRef.on('value', room=>{
            const databaseRoom = room.val()
            const questions: firebaseQuestion = databaseRoom.questions ?? {}

            const parsedQuestions = Object.entries(questions).map(([key, value]) => {
                return {
                    id: key,
                    author: value.author,
                    content: value.content,
                    isHighlited: value.isHighlited,
                    isAnswered: value.isAnswered
                }
            })

            SetTitle(databaseRoom.title)
            Setquestions(parsedQuestions)

        })
    },[roomId])

    async function handleSendQuestion(event: FormEvent){
        event.preventDefault()

        if(NewQuestion.trim() === ''){
            return
        }

        if(!user){
            throw new Error('Cannot find user!')
        }

        const question = {
            content: NewQuestion,
            author: {
                name: user.name,
                avatar: user.avatar
            },
            isHighlited: false,
            isAnswered: false
        }

        await database.ref(`rooms/${roomId}/questions`).push(question)

        SetNewQuestion('')

    }

    return (
        <div id="room-page">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Logo" />
                    <RoomCode code={roomId} />
                </div>
            </header>
            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} perguntas</span>}
                </div>
                <form onSubmit = {handleSendQuestion}>
                    <textarea 
                    placeholder="Faça sua pergunta"
                    onChange = {e => {SetNewQuestion(e.target.value)}}
                    value = {NewQuestion}
                    />
                    <div id="form-footer">
                        {user? (
                            <div className="user-info">
                                <img src={user.avatar} alt="Sua foto" />
                                <span>{user.name}</span>
                            </div>
                        ) : (<span>Para enviar uma pergunta, <button>Faça seu login</button></span>) }
                        <Button type="submit" disabled={!user}>Enviar pergunta</Button>
                    </div>
                </form>

                {JSON.stringify(questions)}
            </main>
        </div>
    )
}