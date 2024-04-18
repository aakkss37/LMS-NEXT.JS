import { toast } from '@/components/ui/use-toast'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React, { Suspense } from 'react'
import Categories from './_components/category'
import CourseList from './_components/course-list'
import Search from './_components/search'


const SearchPage: React.FC = async () => {
    const { userId } = auth()
    if (!userId) {
        toast({
            title: '',
            description: <p className='text-red-600'>Please sign in to access this page..</p>,
        })
        return redirect('/sign-in')
    }
    const courses = await db.course.findMany()
    const categories = await db.category.findMany({
        orderBy: {
            name: 'asc'
        }
    })
    return (
        <main className='p-4 text-sm'>
            <p className='my-2 '>
                <span>Filter Category: </span>
            </p>
            <div className='flex flex-wrap gap-2 justify-start items-center'>
                <Categories categories={categories} />
            </div>
            <div className='my-12 max-w-96 '>
                <Search />
            </div>
            <div className='my-12'>
                <Suspense fallback={<div>Loading...</div>}>
                    <CourseList courses={courses} />
                </Suspense>
            </div>
        </main>
    )
}

export default SearchPage