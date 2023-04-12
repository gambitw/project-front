import { ReactElement } from "react"
import { Episode } from "@/interfaces/episode"

const CardEpisode = ({ name, air_date, episode }: Episode): ReactElement => {
    return (
        <div className="shadow-md rounded bg-white overflow-hidden relative">
            <div className="p-3">
                <span className="uppercase text-xs text-slate-500">
                    {episode}
                </span>
                <h3 className="font-medium">
                    {name}
                </h3>
                <span className="text-sm text-gray-500">
                    {air_date}
                </span>
            </div>
        </div>
    )
}

export default CardEpisode