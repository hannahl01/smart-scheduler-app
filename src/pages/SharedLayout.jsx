import React from 'react'
import { Outlet } from 'react-router-dom'
import { FiSettings } from 'react-icons/fi'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'

import { Navbar, Sidebar, Footer, UserProfile } from '../components'

import { useStateContext } from '../contexts/ContextProvider'
import AddTaskModal from '../components/AddTaskModal'

const SharedLayout = () => {
    const { activeMenu } = useStateContext()

    return (
        <>
            <div className="flex relative dark:bg-main-dark-bg">
                <div
                    className="fixed right-4 bottom-4"
                    style={{ zIndex: '1000' }}
                >
                    <TooltipComponent content="Settings" position="Top">
                        <button
                            type="button"
                            className="text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white"
                            style={{
                                background: 'blue',
                                borderRadius: '50%',
                            }}
                        >
                            <FiSettings />
                        </button>
                    </TooltipComponent>
                </div>
                {activeMenu ? (
                    <div className="w-72 fixed dark:bg-secondary-dark-bg bg-white z-[1000] shadow-sidebar">
                        <Sidebar />
                    </div>
                ) : (
                    <div className="w-0 dark:bg-secondary-dark-bg ">
                        <Sidebar />
                    </div>
                )}
                <div
                    className={
                        activeMenu
                            ? 'dark:bg-main-bg bg-white min-h-screen w-full md:ml-72'
                            : 'dark:bg-main-bg bg-white min-h-screen w-full flex-2'
                    }
                >
                    <div className="fixed left-0 md:left-72 top-0 right-0 bg-main-bg dark:bg-main-dark-bg z-[100]">
                        <Navbar />
                    </div>
                    <div className="mt-16">
                        <Outlet />
                    </div>
                </div>
            </div>
            <AddTaskModal />
        </>
    )
}

export default SharedLayout
