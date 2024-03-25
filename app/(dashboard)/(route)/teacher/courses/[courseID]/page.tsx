import { IconBadge } from '@/components/CustomComponent/icon-badge';
import { toast } from '@/components/ui/use-toast';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { LayoutDashboard } from 'lucide-react';
import { redirect } from 'next/navigation';
import React from 'react'
import { TitleForm } from './_component/title-form';
import { DescriptionForm } from './_component/description-form';
import { ImageForm } from './_component/image-form';


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
    // console.log(course)
    if (!course) {
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
            <section className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-12'>
                <div>
                    <div className='flex items-center gap-y-2'>
                        <IconBadge icon={LayoutDashboard} /> {" "}
                        <h2 className='text-xl'>
                            Customize your course
                        </h2>
                    </div>
                    <TitleForm initialData={course} courseId={course.id} />
                    <DescriptionForm initialData={course} courseId={course.id} />
                    <ImageForm initialData={course} courseId={course.id} />
                </div>
            </section>
        </main>
    );
}

export default CoursePage