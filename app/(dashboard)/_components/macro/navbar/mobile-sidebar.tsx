import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import React from 'react'
import Sidebar from '../sidebar/sidebar'



/**
 * MobileSidebar
 * 
 * The mobile sidebar component.
 * 
 * This component renders a sheet component with a left-side
 * SheetTrigger, which contains a Menu icon, and a SheetContent
 * component which renders the Sidebar component.
 * 
 * The SheetTrigger and SheetContent components are from the ui
 * component library. The Sidebar component is a custom component
 * that renders a sidebar with navigation links
 */
const MobileSidebar: React.FC = () => {
    return (
        <Sheet>
            <SheetTrigger className='md:hidden pr-4 hover:opacity-75 transition'>
                <Menu />
            </SheetTrigger>
            <SheetContent side={'left'} className='p-0'>
                <Sidebar />
            </SheetContent>
        </Sheet>
    )
}

export default MobileSidebar 
