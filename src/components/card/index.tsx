import { ReactElement } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CardPropsType } from './types'

const Card = ({ id, name, image, species }: CardPropsType): ReactElement => {
    return (
        <Link href={`/${id}`} className="w-full bg-white rounded-lg p-12 flex flex-col justify-center items-center shadow rounded ease-in-out duration-300 hover:scale-105">
            <div className="mb-8">
                <Image src={image} width={100} height={100} className="object-center object-cover rounded-full h-36 w-36" alt={name} />
            </div>
            <div className="flex flex-col items-center text-center">
                <p className="text-xl text-gray-700 font-bold mb-2">{name}</p>
                <p className="px-3 bg-white uppercase tracking-wide text-slate-700 text-sm font-semibold border-2 rounded">{species}</p>
            </div>
        </Link>
    )
}

export default Card