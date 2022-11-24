import React from 'react'
import { Link } from 'react-router-dom'

function Landing(props) {
    return (
        <div className="flex place-content-center dark:bg-main-bg bg-main-bg min-h-screen w-full mx-auto">
            <div className="grid md:grid-cols-2 grid-cols-1 md:grid-rows-1 grid-rows-2 gap-5 place-items-center w-3/4">
                <div>
                    <h1 className="text-4xl">Smart Scheduler</h1>
                    <p className="text-sm mt-5">
                        Nisi ea occaecat ad et sint amet tempor sint occaecat
                        Lorem excepteur. Irure qui incididunt ad culpa. Aliquip
                        tempor exercitation duis eiusmod est ut excepteur. Id
                        laboris elit sit ex cupidatat.
                    </p>
                </div>
                <div>
                    <Link to="/register">
                        <div className="rounded-full p-5 hover:bg-cyan-600 bg-cyan-500">
                            <p className="text-slate-50 font-bold">
                                Login/Register
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Landing
