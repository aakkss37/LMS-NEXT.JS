"use client"
import { BarChart, Compass, Layout, List } from 'lucide-react';
import React from 'react'
import SidebarItem from './sidebarItem';
import { usePathname } from 'next/navigation';
/**
 * SidebarRouters
 * 
 * The sidebar router component.
 * 
 * This component renders navigation links based on
 * the user's role. If the user is a teacher, the component
 * renders teacher-specific routes, otherwise it renders
 * guest-specific routes.
 * 
 * The component uses the usePathname hook to get the current
 * pathname and then renders the appropriate routes based
 * on that.
 */
const guestRoutes = [
    {
        /**
         * Dashboard
         * 
         * The Dashboard route renders the dashboard page.
         */
        icon: Layout,
        label: "Dashboard",
        href: "/",
    },
    {
        /**
         * Browse
         * 
         * The Browse route renders the search page.
         */
        icon: Compass,
        label: "Browse",
        href: "/browse",
    },
];

const teacherRoutes = [
    {
        /**
         * Courses
         * 
         * The Courses route renders the courses page.
         */
        icon: List,
        label: "Courses",
        href: "/teacher/courses",
    },
    {
        /**
         * Analytics
         * 
         * The Analytics route renders the analytics page.
         */
        icon: BarChart,
        label: "Analytics",
        href: "/teacher/analytics",
    },
]
/**
 * SidebarRouters
 * 
 * The sidebar router component.
 * 
 * This component renders navigation links based on
 * the user's role. If the user is a teacher, the component
 * renders teacher-specific routes, otherwise it renders
 * guest-specific routes.
 * 
 * The component uses the usePathname hook to get the current
 * pathname and then renders the appropriate routes based
 * on that.
 * 
 * @returns {JSX.Element} The sidebar router component
 */
const SidebarRouters: React.FC = () => {
    const pathname = usePathname()
    return (
        <div className='flex flex-col w-full'>
            {
                /**
                 * Renders the appropriate routes based on the user's role
                 */
                (pathname.includes("/teacher") ? teacherRoutes : guestRoutes).map((route) => (
                    <SidebarItem key={route.label} {...route} />
                ))
            }
        </div>
    )
}

export default SidebarRouters
