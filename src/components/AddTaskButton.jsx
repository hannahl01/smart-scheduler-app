import React, { useState } from 'react'
import { Button } from '.'
import { useStateContext } from '../contexts/ContextProvider'

function AddTaskButton(props) {
    const { calendarScheduleObj } = useStateContext()
    return (
        <Button
            color="white"
            bgColor="cyan-500"
            bgHoverColor="cyan-600"
            text="+ Add event/task"
            borderRadius="full"
            width="full"
            handleClick={() => {}}
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
        />
    )
}

export default AddTaskButton
