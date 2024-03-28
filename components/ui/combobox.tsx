"use client"

import React from "react"
import { ChevronsUpDown } from "lucide-react"

import { Listbox } from '@headlessui/react'
import { CheckIcon } from "lucide-react"


export interface OptionType {
    label: string
    id: string
}
interface PropsType {
    options: OptionType[]
    id?: string
    onChange: (id: string) => void
}

export function Combobox({ options, id, onChange }: PropsType) {
    const [selectedID, setSelectedID] = React.useState(id)
    return (
        <Listbox value={id} onChange={(selectedOptionID) => { setSelectedID(selectedOptionID); onChange(selectedOptionID) }}>
            <Listbox.Button className={` text-sm border px-3 py-2 w-full focus:border-neutral-900 rounded-md flex justify-between items-center`}>
                <span>{selectedID ? options.find((option) => option.id === selectedID)?.label : "Select option..."}</span> <ChevronsUpDown className="h-4" />
            </Listbox.Button>
            <div className="relative">
                <Listbox.Options className={`absolute z-10 w-full mt-1 h-60 overflow-auto rounded-md bg-white text-base shadow-lg`}>
                    {options.map((option) => (
                        <Listbox.Option
                            key={option.id}
                            value={option.id}
                            className={({ active, selected }) => {
                                return `
                                text-sm p-2 px-4 hover:bg-neutral-200 cursor-default
                                ${selectedID === option.id ? "bg-neutral-700 text-white hover:bg-neutral-700 hover:text-white" : "bg-white text-black"}
                                `
                            }}
                        >
                            <li className="flex items-center justify-between">
                                {option.label}
                                {selectedID === option.id && <CheckIcon className="h-4 " />}
                            </li>
                        </Listbox.Option>

                    ))}
                </Listbox.Options>
            </div>
        </Listbox>
    )
}
