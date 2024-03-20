import React from 'react'
import { Logo } from './logo'

const Sidebar: React.FC = () => {
    return (
        <aside className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
            <div className="p-6">
                <Logo />
            </div>
            <main className="flex flex-col w-full">
                Sidebar
            </main>
        </aside>
    )
}

export default Sidebar