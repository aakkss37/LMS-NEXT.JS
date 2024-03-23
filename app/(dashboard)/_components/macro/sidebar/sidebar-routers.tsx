"use client"
import { BarChart, Compass, Layout, List } from 'lucide-react';
import React from 'react'
import SidebarItem from './sidebarItem';
import { usePathname } from 'next/navigation';
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

const teacherRoutes = [
    {
        icon: List,
        label: "Courses",
        href: "/teacher/courses",
    },
    {
        icon: BarChart,
        label: "Analytics",
        href: "/teacher/analytics",
    },
]
const SidebarRouters: React.FC = () => {
    const pathname = usePathname()
    return (
        <div className='flex flex-col w-full'>
            {
                (pathname.includes("/teacher") ? teacherRoutes : guestRoutes).map((route) => (
                    <SidebarItem key={route.label} {...route} />
                ))
            }
        </div>
    )
}

export default SidebarRouters