"use client"
import { UserButton } from '@clerk/nextjs'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { Button } from '../ui/button'
import { LogOut } from 'lucide-react'
import Link from 'next/link'


const NavbarRoutes = () => {
    const pathName = usePathname()
    const router = useRouter()
    const isTeacherPage = pathName?.includes('/teacher')
    const isPlayerPage = pathName?.includes('/chapter')
    return (
        <div className='flex gap-x-2 ml-auto'>
            {
                isTeacherPage || isPlayerPage ?
                    <Button variant='outline' onClick={() => router.push('/')}>
                        <LogOut className='h-4 w-4 mr-2' /> Exit
                    </Button>
                    :
                    <Link href={"/teacher/courses"}>
                        <Button variant='ghost' size={'sm'}>Teacher mode</Button>
                    </Link>
            }
            <UserButton afterSignOutUrl='/' />
        </div>
    )
}

export default NavbarRoutes