import { IconBadge } from '@/components/CustomComponent/icon-badge';
import { toast } from '@/components/ui/use-toast';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { CircleDollarSign, File, LayoutDashboard, ListChecks } from 'lucide-react';
import { redirect } from 'next/navigation';
import React from 'react'
import { TitleForm } from './_component/title-form';
import { DescriptionForm } from './_component/description-form';
import { ImageForm } from './_component/image-form';
import { CategoryForm } from './_component/category-form';
import { PriceForm } from './_component/price-form';
import { AttachmentForm } from './_component/attachment-form';


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
        },
        include: {
            attachments: {
                orderBy: {
                    createdAt: 'desc'
                }
            }
        }
    })
    console.log(course)
    if (!course) {
        return redirect('/teacher/courses')
    }
    const categories = await db.category.findMany({
        orderBy: {
            name: 'asc'
        }
    })
    if (!categories) {
        return redirect('/teacher/courses')
    }
    const categoryOption = categories.map((category) => {
        return {
            label: category.name,
            id: category.id
        }
    })
    // console.log(categories)
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
                <div className='space-y-6'>
                    <div className='flex items-center gap-y-2'>
                        <IconBadge icon={LayoutDashboard} />
                        <h2 className='text-xl ml-2'>
                            Customize your course
                        </h2>
                    </div>
                    <TitleForm initialData={course} courseId={course.id} />
                    <CategoryForm initialData={course} courseId={course.id} options={categoryOption} />
                    <DescriptionForm initialData={course} courseId={course.id} />
                    <ImageForm initialData={course} courseId={course.id} />
                </div>
                <div className='space-y-6'>
                    <div className='flex items-center gap-y-2'>
                        <IconBadge icon={ListChecks} />
                        <h2 className='text-xl ml-2'>
                            Course chapters
                        </h2>
                    </div>
                    <div className='flex items-center gap-y-2'>
                        <p>TODO: CreateChapter</p>
                    </div>
                    <div className='flex items-center gap-y-2'>
                        <IconBadge icon={CircleDollarSign} />
                        <h2 className='text-xl ml-2'>
                            Pricing
                        </h2>
                    </div>
                    <PriceForm initialData={course} courseId={course.id} />
                    <div className='flex items-center gap-y-2'>
                        <IconBadge icon={File} />
                        <h2 className='text-xl ml-2'>
                            Resources and assignments
                        </h2>
                    </div>
                    <AttachmentForm initialData={course} courseId={course.id} />
                </div>
            </section>
        </main>
    );
}

export default CoursePage