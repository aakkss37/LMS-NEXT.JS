import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import React from 'react'
import Sidebar from '../sidebar/sidebar'


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