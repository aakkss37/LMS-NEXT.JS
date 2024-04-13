import React from 'react'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'
import CourseList from './_components/course-list'


const CoursesPage: React.FC = async () => {
    const { userId } = auth()

    if (!userId) {
        toast({
            title: '',
            description: <p className='text-red-600'>Please sign in to access this page..</p>,
        })
        return redirect('/sign-in')
    }
    const courses = await db.course.findMany({
        where: {
            userId: userId
        }
    })
    console.log(courses)
    return (
        <main className='p-4'>
            <div className='flex justify-end'>
                <Link href='/teacher/courses/create'>
                    <Button size={"sm"}>
                        + New Course
                    </Button>
                </Link>
            </div>
            <div className='my-4'>
                <CourseList courses={courses} />
            </div>
        </main>
    )
}

export default CoursesPage