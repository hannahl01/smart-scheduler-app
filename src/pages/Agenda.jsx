import React, { useEffect } from 'react'
import { useStateContext } from '../contexts/ContextProvider'

const Agenda = () => {
    const { scheduleData, fetchData } = useStateContext()

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="ml-10 mr-5 ">
            <ol className="border-l border-gray-300">
                {scheduleData.map((event, i) => {
                    return (
                        <li key={event?.Id}>
                            <div className="flex flex-start items-center pt-3">
                                <div className="bg-gray-300 w-2 h-2 rounded-full -ml-1 mr-3"></div>
                                <p className="text-gray-500 text-sm">
                                    {event?.StartTime}
                                </p>
                            </div>
                            <div className="mt-0.5 ml-4 mb-6">
                                <h4 className="text-gray-800 font-semibold text-xl mb-1.5">
                                    {event?.Subject}
                                </h4>
                                <p className="text-gray-500 mb-3">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Quisque scelerisque diam
                                    non nisi semper, et elementum lorem ornare.
                                    Maecenas placerat facilisis mollis. Duis
                                    sagittis ligula in sodales vehicula.
                                </p>
                            </div>
                        </li>
                    )
                })}
            </ol>
        </div>
    )
}

export default Agenda
