import {Link, useHistory } from 'react-router-dom'
import { FormEvent, useState } from 'react'
import { database } from '../services/firebase'
import { useAuth } from '../hooks/useAuth'
// import { AuthContext } from '../contexts/AuthContext'
// import { useContext } from 'react'

//COMPONENTS=======================================================
import {Button} from '../components/Button'

//IMAGES===========================================================
import IllustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'

//STYLES===========================================================
import "../styles/auth.scss"

export function NewRoom(){
    const [newRoom, SetNewRoom] = useState('')
    const {user} = useAuth()
    const history = useHistory()

    async function handleCreateNewRoom(event: FormEvent){
        event.preventDefault()
        
        if(newRoom.trim() === ''){
            return
        }

        const roomReference = database.ref('rooms')
        const firebaseRoom = await roomReference.push({
            title: newRoom,
            author: user?.id,
      })

      history.push(`/rooms/${firebaseRoom.key}`)
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={IllustrationImg} alt="Ilustração de perguntas e respostas" />
                <strong>Crie salas de Q&amp;A</strong>
                <p>Tire as dúvidas da sua audiencia em tempo real!</p>
            </aside>

            <main>
                <div className = "main-content">
                    <img src={logoImg} alt="Logotipo da aplicação" />

                    <h2>Criar uma nova sala</h2>

                    <form onSubmit = {handleCreateNewRoom}>
                        <input 
                        type="text" 
                        placeholder= "Nome da sala"
                        onChange = {event => SetNewRoom(event.target.value)}
                        value={newRoom}
                        />
                        
                        <Button>
                            Criar sala
                        </Button>

                    </form>
                    <p>Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link> </p>
                </div>
            </main>
        </div>
    )
}