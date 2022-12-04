import React from 'react'
import { Link, NavLink } from 'react-router-dom'
// import { SiShopware } from "react-icons/si";
import { FcCheckmark } from 'react-icons/fc'
import { GiExtraTime, GiDuration } from 'react-icons/gi'
import { MdOutlineCancel } from 'react-icons/md'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'

import { FcCalendar, FcList } from 'react-icons/fc'

import { useStateContext } from '../contexts/ContextProvider'
import { AddTaskButton, Button } from '.'

const links = [
    {
        title: 'Calendar',
        link: '/calendar',
        icon: <FcCalendar />,
    },
    {
        title: 'Agenda',
        link: '/agenda',
        icon: <FcList />,
    },
]
const Sidebar = () => {
    const { activeMenu, setActiveMenu, screenSize, calendarScheduleObj } =
        useStateContext()

    const handleCloseSideBar = () => {
        if (screenSize <= 768) {
            setActiveMenu(false)
        }
    }
    const activeLink =
        'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md m-2 font-bold text-black dark:text-white'
    const normalLink =
        'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md m-2 text-gray-700 hover:bg-light-gray dark:text-gray-200 dark:hover:text-black'
    return (
        <div className="ml-3 mr-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
            {activeMenu && (
                <>
                    <div className="flex justify-between items-center">
                        <Link
                            to="/home"
                            onClick={handleCloseSideBar}
                            className="flex items-center gap-3 ml-3 mt-4 text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
                        >
                            <GiDuration className="text-3xl transition duration-1000 hover:rotate-180" />
                            <span>Smart Scheduler</span>
                        </Link>
                        <TooltipComponent
                            content="Menu"
                            position="BottomCenter"
                        >
                            <button
                                type="button"
                                onClick={() => setActiveMenu(!activeMenu)}
                                className="text-lg rounded-full p-1 hover:bg-light-gray mt-4 block md:hidden"
                            >
                                <MdOutlineCancel />
                            </button>
                        </TooltipComponent>
                    </div>
                    <div className="mt-10">
                        {links.map((item) => (
                            // <div key={item.title}>
                            //     <p className="text-gray-400 m-3 mt-4 uppercase">
                            //         {item.title}
                            //     </p>
                            // </div>
                            <NavLink
                                key={item.title}
                                to={item.link}
                                onClick={handleCloseSideBar}
                                className={({ isActive }) =>
                                    isActive ? activeLink : normalLink
                                }
                            >
                                {item.icon}
                                <span className="capitalize">{item.title}</span>
                            </NavLink>
                        ))}
                    </div>
                </>
            )}
            <div className="flex items-center gap-5 mt-6 px-4 pb-6 pt-3 font-bold text-black dark:text-whiteborder-color border-b-1">
                {/* <Button
                    color="white"
                    bgColor="cyan-500"
                    bgHoverColor="cyan-600"
                    text="+ Add event/task"
                    borderRadius="full"
                    width="full"
                    handleClick={() => {}}
                /> */}
                <AddTaskButton />
            </div>
        </div>
    )
}

export default Sidebar
