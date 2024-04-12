"use client"
import AlertModal from '@/components/CustomComponent/alerts-modal'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import axios from 'axios'
import { LoaderCircle, TrashIcon } from 'lucide-react'
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
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPublishLoading, setIsPublishLoading] = useState(false);

    const togglePublished = async () => {
        try {
            setIsPublishLoading(true)
            await axios.patch(`/api/courses/${courseID}/chapters/${chapterID}`, { isPublished: !isPublished });
            router.refresh();
        } catch (error: Error | any) {
            toast({
                title: ``,
                description: <p className='text-red-500' >Error: {error.message}</p>,
            })
        } finally {
            setIsPublishLoading(false)
        }
    }
    const onDeleteChapter: () => Promise<void> = async () => {
        try {
            setIsDeleting(true)
            await axios.delete(`/api/courses/${courseID}/chapters/${chapterID}`)
            toast({
                title: "",
                description: <p className='text-green-600' >Chapter deleted successfully</p >,
            })
            router.refresh();
            router.push(`/teacher/courses/${courseID}`)
        } catch (error: Error | any) {
            toast({
                title: ``,
                description: <p className='text-red-500' >Error: {error.message}</p>,
            })
        } finally {
            setIsDeleting(false)
        }
    }
    return (
        <div className='flex items-center gap-x-2'>
            <Button
                disabled={disabled || isDeleting}
                variant='outline'
                onClick={togglePublished}
            >
                {isPublishLoading ? <LoaderCircle className='w-4 h-4 animate-spin' /> : isPublished ? "Unpublish" : "Publish"}
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
                    disabled={isDeleting}
                >
                    {isDeleting ? <LoaderCircle className='w-4 h-4 animate-spin' /> : <TrashIcon className='w-4 h-4' />}

                </Button>
            </AlertModal>
        </div>
    )
}

export default ChapterActions