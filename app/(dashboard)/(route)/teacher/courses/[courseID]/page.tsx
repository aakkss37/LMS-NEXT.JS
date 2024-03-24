import { toast } from '@/components/ui/use-toast';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react'


const CoursePage: React.FC<{ params: { courseID: string } }> = async ({ params }) => {
    const { userId } = auth()

    if (!userId) {
        toast({
            title: '',
            description: <p className='text-red-600'>Please sign in to access this page..</p>,
        })
        return redirect('/sign-in')
    }
    const course = await db.course.findUnique({
        where: {
            id: params.courseID
        }
    })

    if (!course) {
        toast({
            title: '',
            description: <p className='text-red-600'>Course not found</p>,
        })
        return redirect('/teacher/courses')
    }

    return (
        <div>
            CourseID:  {params.courseID}
        </div>
    );
}

export default CoursePage