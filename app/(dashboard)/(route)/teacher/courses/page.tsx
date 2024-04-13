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
    return (
        <main className='p-4'>
            <div className='flex justify-between items-center'>
                <div className="flex flex-col gap-x-2">
                    <h1 className='text-2xl font-medium'>
                        Courses
                    </h1>
                    <p className='text-sm text-slate-700'>
                        No. of courses created by you: {courses.length}
                    </p>
                </div>
                <Link href='/teacher/courses/create'>
                    <Button size={"sm"}>
                        + New Course
                    </Button>
                </Link>
            </div>
            <div className='my-12'>
                <CourseList courses={courses} />
            </div>
        </main>
    )
}

export default CoursesPage