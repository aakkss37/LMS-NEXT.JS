import React from 'react'
import { Logo } from './logo'
import SidebarRouters from './sidebar-routers'

const Sidebar: React.FC = () => {
    return (
        <aside className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
            <div className="p-6">
                <Logo />
            </div>
            <main className="flex flex-col w-full">
                <SidebarRouters />
            </main>
        </aside>
    )
}

export default Sidebar