"use client"
import React, { useEffect, useState } from 'react'

import ImageCard from '@/components/CustomComponent/image-card'
import { Course } from '@prisma/client'
import { useRouter } from 'next/navigation'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { toast } from '@/components/ui/use-toast'
import { SearchIcon } from 'lucide-react'

interface CourseListProps {
    courses: Course[]
}

const formSchema = z.object({
    searchInput: z.string(),
})
const CourseList: React.FC<CourseListProps> = ({ courses }) => {
    const router = useRouter()
    const [courseList, setCourseList] = useState<Course[]>(courses);
    const [isSearchLoading, setIsSearchLoading] = useState(false);



    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            searchInput: ""
        }
    })

    const searchCourse = async (query: z.infer<typeof formSchema>) => {
        try {
            setIsSearchLoading(true)
            const filteredCourse = await axios.get(`/api/courses?searchCourse=${query.searchInput}`)
            setCourseList(filteredCourse.data)
        } catch (error: any | Error) {
            setIsSearchLoading(false)
            toast({
                title: ``,
                description: <p className='text-red-500' >Error: {error.message}</p>,
            })
        } finally {
            setIsSearchLoading(false)
        }
    }
    // useEffect(() => {
    //     searchCourse(form.getValues())
    // }, [form]);
    console.log("courseList ====>>>>", courseList);
    return (
        <div>
            <div className='relative my-8 max-w-96'>
                <Form {...form}>
                    <FormField
                        control={form.control}
                        name="searchInput"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder="Search course name"
                                        {...field}
                                        onChange={(e) => {
                                            form.setValue("searchInput", e.target.value);
                                            searchCourse(form.getValues());
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </Form>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    {isSearchLoading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-neutral-700"></div> : <SearchIcon className='text-neutral-500 h-5 w-5' />}
                </span>
            </div>

            {
                courseList.length === 0
                    ? <p className='text-neutral-500 text-center mt-20'>No courses found</p>
                    : <ul role="list" className="grid grid-cols-2 gap-x-2 gap-y-8 sm:grid-cols-3 sm:gap-x-4 lg:grid-cols-5 xl:gap-x-6 cursor-pointer">
                        {courseList.map((course) => (
                            <ImageCard
                                key={course.id}
                                imageUrl={course.imageUrl}
                                onClick={() => router.push(`/teacher/courses/${course.id}`)}
                            >
                                <p className="pointer-events-none block truncate text-sm font-medium text-gray-900">{course.title}</p>
                                <p className="pointer-events-none block text-sm font-medium text-gray-500">Price: ${course.price}</p>
                                <p className="pointer-events-none block text-xs font-medium text-gray-500">Last update: {course.updatedAt ? new Date(course.updatedAt).toDateString() : ""}</p>
                            </ImageCard>
                        ))}
                    </ul>
            }
        </div>
    )
}

export default CourseList