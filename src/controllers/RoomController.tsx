import {  useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AdminRoom } from "../pages/AdminRoom";
import { Room } from "../pages/Room";
import { database } from "../services/firebase";

type RoomParamsType = {
    id: string
}

export function RoomController(){
    const params = useParams<RoomParamsType>()
    const roomId = params.id
    const [AreYouTheAdmin, setAreYouTheAdmin] = useState(false)
    const { user } = useAuth();

    useEffect(()=>{
        const roomRef = database.ref(`rooms/${roomId}`)

        roomRef.on('value',room=>{
            const roomAuthor = room.val().author
            const isAdmin = roomAuthor === user?.id
            setAreYouTheAdmin(isAdmin)
            
            return ()=>{roomRef.off('value')}
        })
    }, [user?.id, roomId])

    if(AreYouTheAdmin){
       return <AdminRoom/>
    }else{
      return <Room/>
    }

}