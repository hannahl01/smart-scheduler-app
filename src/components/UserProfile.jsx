import React from 'react'
import { MdOutlineCancel } from 'react-icons/md'

import { Button } from '.'
import { useStateContext } from '../contexts/ContextProvider'

const UserProfile = () => {
    const { signedInUser, setIsClicked, initialStateNavBar, logoutUser } =
        useStateContext()
    return (
        <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] drop-shadow-xl p-8 rounded-lg w-96">
            <div className="flex justify-between items-center">
                <p className="font-semibold text-lg dark:text-gray-200">
                    User Profile
                </p>
                <Button
                    icon={<MdOutlineCancel />}
                    color="white"
                    bgColor="light-gray"
                    bgHoverColor="light-gray"
                    size="2xl"
                    borderRadius="full"
                    handleClick={() =>
                        setIsClicked({
                            ...initialStateNavBar,
                            userProfile: false,
                        })
                    }
                />
            </div>
            <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
                {signedInUser?.picture ? (
                    <img
                        className="rounded-full h-24 w-24"
                        src={signedInUser?.picture}
                        alt="user-profile"
                    />
                ) : (
                    <div className="flex justify-center items-center rounded-full w-24 h-24 bg-cyan-500 text-4xl font-bold">
                        {signedInUser?.name.slice(0, 1) || ''}
                    </div>
                )}
                <div>
                    <p className="font-semibold text-xl dark:text-gray-200">
                        {' '}
                        {signedInUser?.name || ''}{' '}
                    </p>
                    <p className="text-gray-500 text-sm dark:text-gray-400">
                        {' '}
                        Administrator{' '}
                    </p>
                    <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
                        {' '}
                        {signedInUser?.email || ''}{' '}
                    </p>
                </div>
            </div>
            <div className="mt-5">
                <Button
                    color="white"
                    bgColor="cyan-500"
                    bgHoverColor="light-gray"
                    text="Logout"
                    borderRadius="lg"
                    width="full"
                    handleClick={() => logoutUser()}
                />
            </div>
        </div>
    )
}

export default UserProfile
