import React from 'react'
import Navbar from '@/app/(dashboard)/_components/macro/navbar/navbar'
import Sidebar from '@/app/(dashboard)/_components/macro/sidebar/sidebar'

type Props = {
    children: React.ReactNode
}

const DashboardLayout: React.FC<Props> = ({ children }) => {
    return (
        <div className="h-full">
            <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
                <Navbar />
            </div>
            <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
                <Sidebar />
            </div>
            <main className="md:pl-56 pt-[80px] h-full">
                {children}
            </main>
        </div>
    )
}

export default DashboardLayout