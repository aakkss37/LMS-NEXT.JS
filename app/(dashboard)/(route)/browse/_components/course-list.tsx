/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import React, { useEffect, useState } from 'react'

import ImageCard from '@/components/CustomComponent/image-card'
import { Course } from '@prisma/client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDebounce } from '@/hooks/use-debounce'
import { toast } from '@/components/ui/use-toast'
import axios from 'axios'

interface CourseListProps {
    courses: Course[]
}

const CourseList: React.FC<CourseListProps> = ({ courses }) => {
    const [courseList, setCourseList] = useState<Course[]>(courses);
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isMounted, setIsMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const selectedCategory = searchParams.get('category');
    const debounceValue = useDebounce(searchParams.get('search'), 500)
    console.log(searchParams.get('search'))
    const fetchCourseData = async () => {
        try {
            const response = await axios.get(`/api/browse?category=${selectedCategory}&search=${debounceValue}`);
            console.log(response);
            setCourseList(response.data);
        } catch (error: any | Error) {
            setIsLoading(false)
            toast({
                title: ``,
                description: <p className='text-red-500' >Error: {error.message}</p>,
            })
        } finally {
            setIsLoading(false)
        }
    };

    useEffect(() => {
        if (selectedCategory || debounceValue && isMounted) {
            fetchCourseData();
        } else {
            setIsMounted(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCategory, debounceValue]);


    return (
        <div>
            {
                courseList.length === 0
                    ? <p className='text-neutral-500 text-center mt-20'>No courses found</p>
                    : <ul role="list" className="grid grid-cols-2 gap-x-2 gap-y-8 sm:grid-cols-3 sm:gap-x-4 md:grid-cols-3 md:gap-x-4 xl:grid-cols-5 xl:gap-x-6 cursor-pointer">
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