import React, { useState, useEffect } from 'react'
import * as yup from 'yup'
import { useStateContext } from '../contexts/ContextProvider'

const DateTimePickerComponent = ({
    dateLabel,
    dateName,
    timeLabel,
    timeName,
    dateValue,
    timeValue,
    handleChange,
}) => {
    return (
        <div className="flex items-center justify-center gap-2 w-full">
            <div
                className="datepicker relative form-floating mb-3 w-full"
                data-mdb-toggle-button="false"
            >
                <input
                    type="date"
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Select a date"
                    id={dateName}
                    name={dateName}
                    value={dateValue}
                    onChange={handleChange}
                />
                <label htmlFor={dateName} className="text-gray-700">
                    {dateLabel}
                </label>
                <button
                    className="datepicker-toggle-button"
                    data-mdb-toggle="datepicker"
                >
                    <i className="fas fa-calendar datepicker-toggle-icon"></i>
                </button>
            </div>
            <div className="timepicker relative form-floating mb-3 w-full">
                <input
                    type="time"
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Select a time"
                    id={timeName}
                    name={timeName}
                    value={timeValue}
                    onChange={handleChange}
                />
                <label htmlFor={timeName} className="text-gray-700">
                    {timeLabel}
                </label>
                <button
                    tabIndex="0"
                    type="button"
                    className="timepicker-toggle-button"
                    data-mdb-toggle="timepicker"
                >
                    <i className="fas fa-clock timepicker-icon"></i>
                </button>
            </div>
        </div>
    )
}

const RadioComponent = ({ label, name, items, value, handleChange }) => {
    return (
        <>
            <label className="form-label inline-block self-start mb-2 text-gray-700">
                {label}
            </label>
            <div className="flex justify-start items-center mb-3 w-full">
                {items.length
                    ? items.map((item, i) => (
                          <div key={i} className="form-check form-check-inline">
                              <input
                                  className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                  type="radio"
                                  name={name}
                                  id={item?.value}
                                  value={item?.value}
                                  onChange={handleChange}
                                  checked={item?.value === value}
                              />
                              <label
                                  className="form-check-label inline-block text-gray-800"
                                  htmlFor={item?.value}
                              >
                                  {item?.text}
                              </label>
                          </div>
                      ))
                    : {}}
            </div>
        </>
    )
}

const SelectComponent = ({
    label,
    name,
    items,
    defaultValue,
    value,
    handleChange,
}) => {
    return (
        <div className="mb-3 w-full">
            <label
                className="form-label inline-block self-start mb-2 text-gray-700"
                htmlFor={name}
            >
                {label}
            </label>
            <select
                className="form-select appearance-none
      block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                aria-label="Default value"
                id={name}
                name={name}
                value={value}
                onChange={handleChange}
            >
                {items.length
                    ? items.map((item, i) => (
                          <option key={i} value={item?.value}>
                              {item?.text}
                          </option>
                      ))
                    : {}}
            </select>
        </div>
    )
}

const SwitchComponent = ({ label, name, checked, handleChange }) => {
    return (
        <div className="form-check form-switch mb-3 w-full">
            <input
                className="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm"
                type="checkbox"
                role="switch"
                id={name}
                name={name}
                checked={checked}
                onChange={handleChange}
            />

            <label
                className="form-check-label inline-block text-gray-800"
                htmlFor={name}
            >
                {label}
            </label>
        </div>
    )
}

const InputTextComponent = ({ label, name, value, handleChange }) => {
    return (
        <div className="form-floating mb-3 w-full">
            <input
                type="text"
                className="form-control
block
w-full
px-3
py-1.5
text-base
font-normal
text-gray-700
bg-white bg-clip-padding
border border-solid border-gray-300
rounded
transition
ease-in-out
m-0
focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id={name}
                name={name}
                value={value}
                placeholder="Task name"
                onChange={handleChange}
            />
            <label htmlFor={name} className="text-gray-700">
                {label}
            </label>
        </div>
    )
}

const FormMessageComponent = ({ message }) => {
    return (
        <div
            className="bg-yellow-100 rounded-lg py-5 px-6 mb-3 text-base text-yellow-700 inline-flex items-center w-full"
            role="alert"
        >
            <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="exclamation-triangle"
                className="w-4 h-4 mr-2 fill-current"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
            >
                <path
                    fill="currentColor"
                    d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
                ></path>
            </svg>
            {message}
        </div>
    )
}

const initialFormData = {
    deadlineDate: '',
    deadlineTime: '',
    allowSplit: false,
    estimatedDuration: '{"hour":1}',
    splitDuration: '{"hour":1}',
    startDate: '',
    startTime: '',
    taskName: '',
    priority: 'medium',
}

const initialFormMessage = {
    show: false,
    message: 'none',
}

function AddTaskModal(props) {
    const [formData, setFormData] = useState(initialFormData)
    const [formMessage, setFormMessage] = useState(initialFormMessage)
    const { createEvent } = useStateContext()

    const clearForm = () => {
        setFormData(initialFormData)
        setFormMessage(initialFormMessage)
    }

    let schema = yup.object().shape({
        taskName: yup.string().required('Task name is required'),
        priority: yup.string().required(),
        estimatedDuration: yup.string().required(),
        allowSplit: yup.string().required(),
        deadlineDate: yup.string().required(),
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleChangeCheckbox = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.checked,
        })
    }

    const handleClick = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value === 'off' ? 'on' : 'off',
        })
    }

    const checkValidity = async (data) => {
        // check validity
        try {
            await schema.validate(data)
            // setFormMessage({ show: false, message: '' })
        } catch (err) {
            if (err.name === 'ValidationError') {
                setFormMessage({ show: true, message: err.errors })
            }
        }

        const valid = await schema.isValid(data)
        return valid
    }

    const onCreateEvent = async (e) => {
        e.preventDefault()
        // const formData2 = new FormData(e.target)
        // const plainFormData = Object.fromEntries(formData2.entries())
        // console.log(plainFormData)
        console.log(formData)
        const isValid = await checkValidity(formData)
        if (isValid) {
            const { status } = await createEvent(formData)
            if (status === 201) clearForm()
        }
    }

    const onClear = () => {}
    return (
        <div
            className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog relative w-auto pointer-events-none">
                <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                    <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                        <h5
                            className="text-xl font-medium leading-normal text-gray-800"
                            id="exampleModalLabel"
                        >
                            New event
                        </h5>
                        <button
                            type="button"
                            className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    {/* <div className="modal-body relative p-4">
                        Modal body text goes here.
                    </div> */}

                    <form onSubmit={(e) => onCreateEvent(e)}>
                        <div className="modal-body ">
                            <div className="w-auto flex flex-col items-center justify-center p-4 gap-2">
                                {formMessage?.show && (
                                    <FormMessageComponent
                                        message={formMessage?.message}
                                    />
                                )}
                                <InputTextComponent
                                    label="Task name"
                                    name="taskName"
                                    value={formData?.taskName}
                                    handleChange={handleChange}
                                />
                                <RadioComponent
                                    label="Priority"
                                    name="priority"
                                    items={[
                                        {
                                            value: 'high',
                                            text: 'High Priority',
                                        },
                                        {
                                            value: 'medium',
                                            text: 'Medium Priority',
                                        },
                                        { value: 'low', text: 'Low Priority' },
                                    ]}
                                    value={formData?.priority}
                                    handleChange={handleChange}
                                />
                                <SelectComponent
                                    label="Estimated Duration"
                                    name="estimatedDuration"
                                    items={[
                                        {
                                            value: JSON.stringify({
                                                minute: 15,
                                            }),
                                            text: '15 minutes',
                                        },
                                        {
                                            value: JSON.stringify({
                                                minute: 30,
                                            }),
                                            text: '30 minutes',
                                        },
                                        {
                                            value: JSON.stringify({ hour: 1 }),
                                            text: '1 hour',
                                        },
                                        {
                                            value: JSON.stringify({ hour: 2 }),
                                            text: '2 hours',
                                        },
                                    ]}
                                    value={formData?.estimatedDuration}
                                    handleChange={handleChange}
                                />

                                <SwitchComponent
                                    label="Split into multiple tasks?"
                                    name="allowSplit"
                                    checked={formData?.allowSplit}
                                    handleChange={handleChangeCheckbox}
                                />

                                {formData.allowSplit && (
                                    <SelectComponent
                                        label="Split Duration"
                                        name="splitDuration"
                                        items={[
                                            {
                                                value: JSON.stringify({
                                                    minute: 15,
                                                }),
                                                text: '15 minutes',
                                            },
                                            {
                                                value: JSON.stringify({
                                                    minute: 30,
                                                }),
                                                text: '30 minutes',
                                            },
                                            {
                                                value: JSON.stringify({
                                                    hour: 1,
                                                }),
                                                text: '1 hour',
                                            },
                                            {
                                                value: JSON.stringify({
                                                    hour: 2,
                                                }),
                                                text: '2 hours',
                                            },
                                        ]}
                                        value={formData?.splitDuration}
                                        handleChange={handleChange}
                                    />
                                )}

                                <DateTimePickerComponent
                                    dateLabel="Start date"
                                    dateName="startDate"
                                    timeLabel="Start time"
                                    timeName="startTime"
                                    dateValue={formData?.startDate}
                                    timeValue={formData?.startTime}
                                    handleChange={handleChange}
                                />
                                <DateTimePickerComponent
                                    dateLabel="Deadline date"
                                    dateName="deadlineDate"
                                    timeLabel="Deadline time"
                                    timeName="deadlineTime"
                                    dateValue={formData?.deadlineDate}
                                    timeValue={formData?.deadlineTime}
                                    handleChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                            <button
                                type="button"
                                className="px-6
          py-2.5
          bg-purple-600
          text-white
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-md
          hover:bg-purple-700 hover:shadow-lg
          focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-purple-800 active:shadow-lg
          transition
          duration-150
          ease-in-out"
                                data-bs-dismiss="modal"
                            >
                                Clear
                            </button>
                            <button
                                type="submit"
                                className="px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out
      ml-1"
                            >
                                Add Event
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddTaskModal
