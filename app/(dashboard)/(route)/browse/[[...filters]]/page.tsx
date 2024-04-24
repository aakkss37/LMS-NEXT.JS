import { toast } from '@/components/ui/use-toast'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React, { Suspense } from 'react'
import Categories from '../_components/category'
import CourseList from '../_components/course-list'
import Search from '../_components/search'
import { Course } from '@prisma/client'


const SearchPage: React.FC<{ params: { filters: string[] }, searchParams: { [key: string]: string } }> = async ({ params, searchParams }) => {
    console.log(params.filters)
    console.log("searchhhhh", searchParams)
    const { userId } = auth()
    if (!userId) {
        toast({
            title: '',
            description: <p className='text-red-600'>Please sign in to access this page..</p>,
        })
        return redirect('/sign-in')
    }
    // console.log(courses)
    const categorySelected = params.filters ? params.filters[0] : undefined;
    const searchQuery = searchParams.s ?? undefined;
    let filteredCourse: Course[]
    if (searchQuery && !categorySelected) {
        console.log("only search")
        filteredCourse = await db.course.findMany({
            where: {
                title: { contains: searchQuery },
            }
        })
    } else if (categorySelected && !searchQuery) {
        console.log("only category")
        filteredCourse = await db.course.findMany({
            where: {
                categoryID: { contains: categorySelected, not: null }
            }
        })
    } else if (categorySelected && searchQuery) {
        console.log("both search and category")
        filteredCourse = await db.course.findMany({
            where: {
                title: { contains: searchQuery },
                categoryID: { contains: categorySelected, not: null }
            }
        })
    } else filteredCourse = await db.course.findMany()

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
                <Categories categories={categories} selectedCategory={categorySelected} />
            </div>
            <div className='my-12 max-w-96 '>
                <Search params={params} searchParams={searchParams} />
            </div>
            <div className='my-12'>
                <CourseList courses={filteredCourse} />
            </div>
        </main>
    )
}

export default SearchPage