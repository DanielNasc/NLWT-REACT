//IMPORTS======================================================================================================================
// import { useContext } from 'react'
// import { AuthContext } from '../contexts/AuthContext'
import { useAuth } from '../hooks/useAuth'
import { useHistory } from 'react-router-dom'


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

    async function SignInWithGoogleAndCreateNewRoom(){
        if(!user){
            await SignInWithGoogle()
        }

        history.push("/rooms/new")
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

                <form action="">
                    <input 
                    type="text" 
                    placeholder= "Digite o código da sala"
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