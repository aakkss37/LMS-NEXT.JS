import { IconBadge } from '@/components/CustomComponent/icon-badge';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { ArrowLeft, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'
import { ChapterTitleForm } from './_component/title-form';

const ChapterPage: React.FC<{ params: { courseID: string, chapterID: string } }> = async ({ params }) => {
    const { userId } = auth();
    if (!userId) return redirect('/sign-in')
    const chapter = await db.chapter.findUnique({
        where: {
            id: params.chapterID,
            courseId: params.courseID
        },
        include: {
            muxData: true
        }
    })
    if (!chapter) return redirect('/teacher/courses')
    const requiredFields = [
        chapter.title,
        chapter.description,
        chapter.videoUrl
    ];
    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;
    const progress = `${completedFields}/${totalFields}`
    return (
        <main className='p-4'>
            <section className="flex items-center justify-between">
                <div className="w-full">
                    <Link
                        href={`/teacher/courses/${params.courseID}`}
                        className="flex items-center text-sm hover:opacity-75 transition mb-6"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to course setup
                    </Link>
                    <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col gap-y-2">
                            <h1 className="text-2xl font-medium">
                                Chapter Creation
                            </h1>
                            <span className="text-sm text-slate-700">
                                Complete all fields {progress}
                            </span>
                        </div>
                        {/* <ChapterActions
                            disabled={!isComplete}
                            courseId={params.courseId}
                            chapterId={params.chapterId}
                            isPublished={chapter.isPublished}
                        /> */}
                    </div>
                </div>
            </section>
            <section className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-16'>
                <div className="space-y-6">
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={LayoutDashboard} />
                        <h2 className='text-xl'>Customize your chapter</h2>
                    </div>
                    <ChapterTitleForm initialData={chapter} courseId={params.courseID} chapterId={params.chapterID} />
                </div>
            </section>
        </main>
    )
}

export default ChapterPage