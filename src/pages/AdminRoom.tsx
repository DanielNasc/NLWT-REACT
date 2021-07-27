import { useHistory, useParams } from 'react-router-dom'
import { Button } from '../components/Button' 
import { RoomCode } from '../components/Room-code'
import { Questions } from '../components/Question'
import { useRoom } from '../hooks/useRoom'
import { database } from '../services/firebase'

import logoImg from '../assets/images/logo.svg'
import deleteImg from '../assets/images/delete.svg'
import checkImg from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'
import '../styles/room.scss'

export type RoomParamsType = {
    id: string
}

export function AdminRoom(){
    const params = useParams<RoomParamsType>()
    const roomId = params.id
    //const {user} = useAuth()
    const {title, questions} = useRoom(roomId)
    const history = useHistory()

    async function handleCheckQuestionAsAnswered(questionId: string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true
        })
    }

    async function handleHighlightQuestion(questionId: string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlited: true,
        })
        
    }

    async function handleDeleteQuestion(questionId: string){
        if(window.confirm('Você deseja excluir esta pergunta?')){
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
        }
    }

    async function handleEndRoom(){
        if(window.confirm('Você deseja terminar esta sala?')){
            database.ref(`rooms/${roomId}/`)
            .update({
                endedAt: new Date(),
            })

            history.push('/')
        }
    }


    return (
        <div id="room-page">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Logo" />
                    <div>
                        <RoomCode code={roomId} />
                        <Button isOutlined onClick={handleEndRoom}>Deletar sala</Button>
                    </div>
                </div>
            </header>
            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} perguntas</span>}
                </div>
              
                <div className="questions-list">
                    {
                        questions.map(question => {
                            return (
                                <Questions
                                    key= {question.id}
                                    content= {question.content}
                                    author = {question.author}
                                    isAnswered= {question.isAnswered}
                                    isHighlited = {question.isHighlited}
                                >

                                        {!question.isAnswered && (
                                            <>
                                                <button
                                                type='button'
                                                onClick={()=>handleCheckQuestionAsAnswered(question.id)}
                                                >
                                                        <img src={checkImg} alt="Marcar pergunta como lida" />  
                                                </button>

                                                <button
                                                type='button'
                                                onClick={()=>handleHighlightQuestion(question.id)}
                                                >
                                                        <img src={answerImg} alt="Destacar pergunta" />  
                                                </button>
                                            </>
                                        )}

                                        <button
                                        type='button'
                                        onClick={()=>handleDeleteQuestion(question.id)}
                                        >
                                            <img src={deleteImg} alt="Deletar pergunta" />  
                                        </button>
                                </Questions>
                            )
                        })
                    }
                </div>
            </main>
        </div>
    )
}