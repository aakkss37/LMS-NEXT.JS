"use client"
import { Compass, Layout } from 'lucide-react';
import React from 'react'
import SidebarItem from './sidebarItem';
const guestRoutes = [
    {
        icon: Layout,
        label: "Dashboard",
        href: "/",
    },
    {
        icon: Compass,
        label: "Browse",
        href: "/search",
    },
];

const SidebarRouters: React.FC = () => {

    return (
        <div className='flex flex-col w-full'>
            {
                guestRoutes.map((route) => (
                    <SidebarItem key={route.label} {...route} />
                ))
            }
        </div>
    )
}

export default SidebarRouters