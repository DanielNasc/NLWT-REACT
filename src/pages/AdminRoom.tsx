import { useHistory, useParams } from 'react-router-dom'
import { Button } from '../components/Button' 
import { RoomCode } from '../components/Room-code'
import { Questions } from '../components/Question'
import { useRoom } from '../hooks/useRoom'

import logoImg from '../assets/images/logo.svg'
import deleteImg from '../assets/images/delete.svg'
import '../styles/room.scss'
import { database } from '../services/firebase'

type RoomParamsType = {
    id: string
}


export function AdminRoom(){
    const params = useParams<RoomParamsType>()
    const roomId = params.id
    //const {user} = useAuth()
    const {title, questions} = useRoom(roomId)
    const history = useHistory()

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
                                >
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