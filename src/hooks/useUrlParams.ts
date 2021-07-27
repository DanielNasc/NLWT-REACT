import { useParams } from "react-router-dom"

export type RoomParamsType = {
    id: string
}

export function useUrlParams(){
    return useParams<RoomParamsType>()
}