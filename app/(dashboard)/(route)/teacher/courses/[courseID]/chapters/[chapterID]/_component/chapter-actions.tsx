"use client"
import { Button } from '@/components/ui/button'
import { TrashIcon } from 'lucide-react'
import React from 'react'

interface ChapterActionsProps {
    disabled?: boolean
    courseID: string
    chapterID: string
    isPublished: boolean
}


const ChapterActions: React.FC<ChapterActionsProps> = ({ disabled, courseID, chapterID, isPublished }) => {
    return (
        <div className='flex items-center gap-x-2'>
            <Button
                disabled={disabled}
                variant='outline'
                onClick={() => window.open(`/teacher/courses/${courseID}/chapters/${chapterID}/page`)}
            >
                {isPublished ? "Unpublish" : "Publish"}
            </Button>
            <Button
                className='bg-red-50 text-red-600 hover:bg-red-600 hover:text-white text-sm'
                onClick={() => window.open(`/teacher/courses/${courseID}/chapters/${chapterID}/edit`)}
            >
                <TrashIcon className='w-4 h-4' />
            </Button>
        </div>
    )
}

export default ChapterActions