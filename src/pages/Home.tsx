//IMPORTS======================================================================================================================
// import { useContext } from 'react'
// import { AuthContext } from '../contexts/AuthContext'
import { useAuth } from '../hooks/useAuth'
import { useHistory } from 'react-router-dom'
import { FormEvent, useState } from 'react'
import { database } from '../services/firebase'


//COMPONENTS=======================================================
import {Button} from '../components/Button'

//IMAGES===========================================================
import IllustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleImage from '../assets/images/google-icon.svg'

//STYLES===========================================================
import "../styles/auth.scss"

export function Home(){
    const history = useHistory()
    const {user, SignInWithGoogle} = useAuth()
    const [ roomId, SetRoomId ] = useState('')

    async function SignInWithGoogleAndCreateNewRoom(){
        if(!user){
            await SignInWithGoogle()
        }

        history.push("/rooms/new")
    }

    async function handleJoinRoom(event: FormEvent){
        event.preventDefault()

        if(roomId.trim() === ''){
            return
        }

        const roomReference = await database.ref(`rooms/${roomId}`).get()

        if(!roomReference.exists()){
            alert('Room doesn\'t exist!')
            return
        }

        if(roomReference.val().endedAt){
            alert('A sala já foi encerrada :/')
            return
        }

        history.push(`/rooms/${roomId}`)
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

                    <button className = "create-room-with-google" onClick = {SignInWithGoogleAndCreateNewRoom}>
                        <img src={googleImage} alt="Logo do Google" />
                        Crie sua sala com o Google
                    </button>

                <div className = "separator">
                    Ou entre em uma já existente
                </div>

                <form onSubmit = {handleJoinRoom}>
                    <input 
                    type="text" 
                    placeholder= "Digite o código da sala"
                    onChange = {event => SetRoomId(event.target.value)}
                    value = {roomId}
                    />
                    
                    <Button>
                        Entrar na sala
                    </Button>

                </form>
                </div>
            </main>
        </div>
    )
}