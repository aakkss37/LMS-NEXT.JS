"use client"
import React from 'react'

import ImageCard from '@/components/CustomComponent/image-card'
import { Course } from '@prisma/client'
import { useRouter } from 'next/navigation'

interface CourseListProps {
    courses: Course[]
}

const CourseList: React.FC<CourseListProps> = ({ courses }) => {
    const router = useRouter()
    return (
        <ul role="list" className="grid grid-cols-2 gap-x-2 gap-y-8 sm:grid-cols-4 sm:gap-x-4 lg:grid-cols-6 xl:gap-x-6 cursor-pointer">
            {courses.map((course) => (
                <ImageCard
                    key={course.id}
                    imageUrl={course.imageUrl}
                    onClick={() => router.push(`/teacher/courses/${course.id}`)}
                >
                    <p className="pointer-events-none block truncate text-sm font-medium text-gray-900">{course.title}</p>
                    <p className="pointer-events-none block text-sm font-medium text-gray-500">Price: ${course.price}</p>
                    <p className="pointer-events-none block text-xs font-medium text-gray-500">Updated on: {course.updatedAt.toLocaleDateString()}</p>
                </ImageCard>
            ))}
        </ul>
    )
}

export default CourseList