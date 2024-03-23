import React from 'react'
import { Logo } from './logo'
import SidebarRouters from './sidebar-routers'

/**
 * Sidebar
 * 
 * The sidebar component.
 * 
 * This component renders the sidebar with a logo and navigation
 * links based on the user's role. The component uses the
 * SidebarRouters component to render the navigation links.
 * 
 * @returns {JSX.Element} The sidebar component
 */
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