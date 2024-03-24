import { IconBadge } from '@/components/CustomComponent/icon-badge';
import { toast } from '@/components/ui/use-toast';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { LayoutDashboard } from 'lucide-react';
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

    const requiredFields = [
        course.title,
        course.description,
        course.imageUrl,
        course.price,
        course.categoryID,
    ]
    const totalRequiredFields = requiredFields.length
    const completedFields = requiredFields.filter(Boolean).length
    const completionText = `${completedFields}/${totalRequiredFields}`

    return (
        <main className='p-4'>
            <section className='flex items-center justify-between'>
                <div className="flex flex-col gap-y-2">
                    <h1 className='text-2xl font-medium'>
                        Course setup
                    </h1>
                    <p className='text-sm text-slate-700'>
                        Complete all fields ({completionText})
                    </p>
                </div>
            </section>
            <section className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-6'>
                <div className='flex items-center justify-center gap-y-2'>
                    <IconBadge icon={LayoutDashboard} /> {" "}
                    <h2 className='text-xl'>
                        Customize your course
                    </h2>
                </div>
            </section>
        </main>
    );
}

export default CoursePage