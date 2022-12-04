import React from 'react'

import { useStateContext } from '../contexts/ContextProvider'

const Button = ({
    icon,
    bgColor,
    color,
    bgHoverColor,
    size,
    text,
    borderRadius,
    width,
    handleClick,
    ...other
}) => {
    const { setIsClicked, initialStateNavBar } = useStateContext()
    return (
        <button
            type="button"
            onClick={handleClick}
            // style={{ backgroundColor: bgColor, color, borderRadius }}
            className={`text-${size} p-3 w-${width} hover:drop-shadow-xl bg-${bgColor} hover:bg-${bgHoverColor} rounded-${borderRadius}`}
            {...other}
        >
            {icon} {text}
        </button>
    )
}

export default Button
