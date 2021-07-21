import {Link} from 'react-router-dom'

//COMPONENTS
import {Button} from '../components/Button'

//IMAGES
import IllustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'

import "../styles/auth.scss"

export function NewRoom(){
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

                    <form action="">
                        <input 
                        type="text" 
                        placeholder= "Nome da sala"
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