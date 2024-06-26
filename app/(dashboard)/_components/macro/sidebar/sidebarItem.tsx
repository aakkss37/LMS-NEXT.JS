"use client"
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'

type Props = {
    icon: LucideIcon;
    label: string;
    href: string;
}

/**
 * SidebarItem
 * 
 * The sidebar item component.
 * 
 * This component renders a single navigation link in the
 * sidebar. It takes the icon, label, and href of the link as
 * props. The component uses the usePathname hook to get the
 * current pathname and highlight the link if the current path
 * matches the link's href or starts with the link's href
 * followed by a slash.
 * 
 * @param icon The icon component to render
 * @param label The label to render
 * @param href The href to render
 * 
 * @returns {JSX.Element} The sidebar item component
 */
const SidebarItem: React.FC<Props> = ({
    icon: Icon,
    label,
    href,
}) => {
    const pathname = usePathname()
    const router = useRouter()
    const isActive = (pathname === "/" && href === "/") || pathname === href || pathname?.startsWith(`${href}/`)

    const onClick = () => {
        router.push(href);
    }
    return (
        <button
            onClick={onClick}
            type="button"
            className={cn(
                "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
                isActive && "text-gray-700 bg-gray-300/20 hover:bg-gray-300/20 hover:text-gray-700 "
            )}
        >
            <div className="flex items-center gap-x-2 py-4">
                <Icon
                    size={22}
                    className={cn(
                        "text-slate-500",
                        isActive && "text-gray-700"
                    )}
                />
                {label}
            </div>
            <div
                className={cn(
                    "ml-auto opacity-0 border-2 border-gray-700 h-full transition-all",
                    isActive && "opacity-100"
                )}
            />
        </button>
    )
}

export default SidebarItem