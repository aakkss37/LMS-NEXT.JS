/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import React, { useState } from 'react'

import ImageCard from '@/components/CustomComponent/image-card'
import { Course } from '@prisma/client'
import { useRouter } from 'next/navigation'

interface CourseListProps {
    courses: Course[]
}

const CourseList: React.FC<CourseListProps> = ({ courses }) => {
    const router = useRouter()
    const [courseList] = useState<Course[]>(courses);

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