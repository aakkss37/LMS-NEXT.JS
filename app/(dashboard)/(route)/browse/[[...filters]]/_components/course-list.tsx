import React from 'react'
import ImageCard from '@/components/CustomComponent/image-card'
import { Course } from '@prisma/client'
import Link from 'next/link'

interface CourseListProps {
    courses: Course[]
}

const CourseList: React.FC<CourseListProps> = ({ courses }) => {

    return (
        <div>
            {
                courses.length === 0
                    ? <p className='text-neutral-500 text-center mt-20'>No courses found</p>
                    : <ul role="list" className="grid grid-cols-2 gap-x-2 gap-y-8 sm:grid-cols-3 sm:gap-x-4 md:grid-cols-3 md:gap-x-4 xl:grid-cols-5 xl:gap-x-6 cursor-pointer">
                        {courses.map((course) => (
                            <Link key={course.id} href={`/teacher/courses/${course.id}`}>
                                <ImageCard
                                    key={course.id}
                                    imageUrl={course.imageUrl}
                                >
                                    <p className="pointer-events-none block truncate text-sm font-medium text-gray-900">{course.title}</p>
                                    <p className="pointer-events-none block text-sm font-medium text-gray-500">Price: ${course.price}</p>
                                    <p className="pointer-events-none block text-xs font-medium text-gray-500">Last update: {course.updatedAt ? new Date(course.updatedAt).toDateString() : ""}</p>
                                </ImageCard>
                            </Link>
                        ))}
                    </ul>
            }
        </div>
    )
}

export default CourseList