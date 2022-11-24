import React, { useEffect } from 'react'
import { HiMenu, HiOutlineBell, HiOutlineChevronDown } from 'react-icons/hi'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'

import { UserProfile } from '.'

import { useStateContext } from '../contexts/ContextProvider'

const NavButton = ({ title, customFunc, icon, dotColor }) => {
    return (
        <TooltipComponent content={title} position="BottomCenter">
            <button
                type="button"
                onClick={customFunc}
                className="relative text-xl rounded-full p-3 hover:bg-light-gray"
            >
                <span
                    style={{ background: dotColor }}
                    className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
                />
                {icon}
            </button>
        </TooltipComponent>
    )
}

const Navbar = () => {
    const {
        activeMenu,
        setActiveMenu,
        signedInUser,
        screenSize,
        setScreenSize,
        handleClick,
        isClicked,
    } = useStateContext()

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth)
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        if (screenSize <= 768) {
            setActiveMenu(false)
        } else {
            setActiveMenu(true)
        }
    }, [screenSize])

    return (
        <div className="flex justify-between p-2 md:mx-6 relative">
            <div className="md:invisible">
                <NavButton
                    title="Menu"
                    customFunc={() => setActiveMenu(!activeMenu)}
                    icon={<HiMenu />}
                />
            </div>
            <div className="flex gap-3">
                <NavButton
                    title="Notification"
                    dotColor="rgb(254, 201, 15)"
                    customFunc={() => {}}
                    icon={<HiOutlineBell />}
                />
                <TooltipComponent content="Profile" position="BottomCenter">
                    <div
                        className="flex items-center gap-2 cursor-pointer py-1 px-2 md:px-1 hover:bg-light-gray rounded-lg"
                        onClick={() => handleClick('userProfile')}
                    >
                        {signedInUser?.picture ? (
                            <img
                                className="rounded-full w-8 h-8"
                                src={signedInUser?.picture}
                                alt="user-profile"
                            />
                        ) : (
                            <div className="flex justify-center items-center rounded-full w-8 h-8 bg-cyan-500 text-lg">
                                {signedInUser?.name.slice(0, 1) || ''}
                            </div>
                        )}
                        <div className="hidden md:flex gap-2 items-center">
                            <p>
                                <span className="text-gray-400 text-14">
                                    Hi,
                                </span>{' '}
                                <span className="text-gray-400 font-bold ml-1 text-14">
                                    {signedInUser?.name || 'Null'}
                                </span>
                            </p>
                            <HiOutlineChevronDown className="text-gray-400 text-14" />
                        </div>
                    </div>
                </TooltipComponent>

                {isClicked.userProfile && <UserProfile />}
            </div>
        </div>
    )
}

export default Navbar
