import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'


const CoursesPage: React.FC = () => {
    return (
        <main className='p-2'>
            <Link href='/teacher/courses/create'>
                <Button size={"sm"}>
                    + New Course
                </Button>
            </Link>
        </main>
    )
}

export default CoursesPage