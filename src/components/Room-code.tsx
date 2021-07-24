import copyImg from '../assets/images/copy.svg'
import '../styles/room-code.scss'

type RoomCodeTypeProps = {
    code: string
}

export function RoomCode(props: RoomCodeTypeProps){

    function copyCodeToClipboard() {
        navigator.clipboard.writeText(props.code)
    }

    return(
        <button className="roomCode" onClick={copyCodeToClipboard}>
            <div>
                <img src={copyImg} alt="Copiar código de sala" />
            </div>
            <span>Sala #{props.code}</span>
        </button>
    )
}