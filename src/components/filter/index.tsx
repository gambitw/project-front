"use client"
import { ReactElement, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { FaFilter, FaSpinner } from "react-icons/fa"

import { FilterPropTypes } from "@/interfaces/filter"
import { filterCharacters } from "@/services"

const Filter = ({ filter }: FilterPropTypes ): ReactElement => {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        defaultValues: {
            name: '',
            status: '',
            type: '',
            species: '',
            gender: ''
        }
      })

      const onSubmit: SubmitHandler<FieldValues> = async (formState) => {
        try {
            setLoading(true)
            setError(false)
            const { results } = await filterCharacters(formState)
            if (!results) return setError(true)
            filter(results)
        } catch (error: unknown) {
            console.warn('error', error)
          setError(true)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex justify-content-center mt-8">
            <div className="flex max-w-3xl mx-auto">
                <div className="flex align-middle mx-auto">
                    <div className="space-y-3">
                        <div className="flex space-x-2">
                            <button type="button" className="flex flex-row items-center space-x-3 px-4 bg-white border">
                                <FaFilter />
                                <span>Filters</span>
                            </button>
                            <input type="text" className="w-full bg-white border p-2" placeholder="Busque um personagem" {...register('name')} />
                            <button disabled={loading} type="submit" className="flex flex-row items-center space-x-3 px-4 bg-blue-500 text-white font-semibold">
                                {!loading ? <span>Buscar</span> : (
                                    <>
                                        <FaSpinner className="animate-spin" />
                                        <span>Carregando</span>
                                    </>
                                )}
                            </button>
                        </div>
                        <div className="grid grid-cols-4 gap-3">
                            <div className="text-left">
                                <label htmlFor="status" className="text-sm font-medium text-gray-900">
                                    Status
                                </label>
                                <select id="status" {...register('status')} className="block bg-white text-gray-900 text-sm w-full p-2.5 px-4 border">
                                    <option value=''>Todos</option>
                                    {['alive', 'dead', 'unknown'].map((item, index) => <option key={index} value={item}>{item}</option>)}
                                </select>
                            </div>
                            <div className="text-left">
                                <label htmlFor="species" className="text-sm font-medium text-gray-900">
                                    Espécie
                                </label>
                                <input id="species" type="text" {...register('species')} className="w-full bg-white border p-2" placeholder="Busque por espécie" />
                            </div>
                            <div className="text-left">
                                <label htmlFor="type" className="text-sm font-medium text-gray-900">
                                    Tipo
                                </label>
                                <input id="type" type="text" {...register('type')} className="w-full bg-white border p-2" placeholder="Busque por Tipo" />
                            </div>
                            <div className="text-left">
                                <label htmlFor="gender" className="text-sm font-medium text-gray-900">
                                    Gênero
                                </label>
                                <select id="gender" {...register('gender')} className="block bg-white text-gray-900 text-sm w-full p-2.5 px-4 border">
                                    <option value=''>Todos</option>
                                    {['female', 'male', 'genderless', 'unknown'].map((item, index) => <option key={index} value={item}>{item}</option>)}
                                </select>
                            </div>
                        </div>
                        {error && (
                            <div className="mb-4 block w-full rounded-lg bg-red-500 p-4 text-base leading-5 text-white opacity-100">
                                A pesquisa não retornou resultados
                            </div>
                        )}
                    </div>
                </div>
            </div>
		</form>
    )   
}

export default Filter