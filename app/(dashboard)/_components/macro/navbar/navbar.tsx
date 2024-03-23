import React from 'react'
import MobileSidebar from './mobile-sidebar'
import NavbarRoutes from '@/components/CustomComponent/navbar-routes'

/**
 * Navbar
 * 
 * The navbar component.
 * 
 * This component renders a navbar with a MobileSidebar
 * component and a NavbarRoutes component.
 * 
 * The MobileSidebar component is a custom component that renders
 * a sidebar with a Menu icon, which when clicked toggles the
 * display of the sidebar.
 * 
 * The NavbarRoutes component is a custom component that renders
 * navigation links.
 */
const Navbar: React.FC = () => {
    return (
        <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
            <MobileSidebar />
            <NavbarRoutes />
        </div>
    )
}


export default Navbar