"use client"
import AlertModal from '@/components/CustomComponent/alerts-modal'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import axios from 'axios'
import { TrashIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

interface ChapterActionsProps {
    disabled?: boolean
    courseID: string
    chapterID: string
    isPublished: boolean
}


const ChapterActions: React.FC<ChapterActionsProps> = ({ disabled, courseID, chapterID, isPublished }) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);
    const onDeleteChapter = async () => {
        try {
            setIsLoading(true)
            await axios.delete(`/api/courses/${courseID}/chapters/${chapterID}`)
            toast({
                title: "",
                description: <p className='text-green-600' >Chapter deleted successfully</p >,
            })
            router.push(`/teacher/courses/${courseID}`)
        } catch (error: Error | any) {
            setIsLoading(false)
            toast({
                title: ``,
                description: <p className='text-red-500' >Error: {error.message}</p>,
            })
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div className='flex items-center gap-x-2'>
            <Button
                disabled={disabled || isLoading}
                variant='outline'
                onClick={() => window.open(`/teacher/courses/${courseID}/chapters/${chapterID}/page`)}
            >
                {isPublished ? "Unpublish" : "Publish"}
            </Button>
            <AlertModal
                onConfirm={onDeleteChapter}
                title='Are you sure you want to delete this chapter?'
                description='This action cannot be undone.'
                confirmText='Delete Chapter'
                confirmVariant='destructive'
            >
                <Button
                    className='bg-red-50 text-red-600 hover:bg-red-500 hover:text-white text-sm'
                    disabled={isLoading}
                >
                    <TrashIcon className='w-4 h-4' />
                </Button>
            </AlertModal>
        </div>
    )
}

export default ChapterActions