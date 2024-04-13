"use client"
import AlertModal from '@/components/CustomComponent/alerts-modal'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { useConfettiStore } from '@/hooks/use-confetti'
import axios from 'axios'
import { LoaderCircle, TrashIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

interface CourseActionsProps {
    disabled?: boolean
    courseID: string
    isPublished: boolean
}


const CourseActions: React.FC<CourseActionsProps> = ({ disabled, courseID, isPublished }) => {
    const router = useRouter()
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPublishLoading, setIsPublishLoading] = useState(false);
    const confetti = useConfettiStore();

    const togglePublished = async () => {
        try {
            setIsPublishLoading(true)
            await axios.patch(`/api/courses/${courseID}`, { isPublished: !isPublished });
            // Show confetti animation if course is published
            if (!isPublished === true) confetti.openConfetti();
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
    const onDeleteCourse: () => Promise<void> = async () => {
        try {
            setIsDeleting(true)
            await axios.delete(`/api/courses/${courseID}`)
            router.push(`/teacher/courses`)
            router.refresh();
            toast({
                title: "",
                description: <p className='text-green-600' >Course deleted successfully</p >,
            })
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
                onConfirm={onDeleteCourse}
                title='Are you sure you want to delete this course?'
                description='This action cannot be undone.'
                confirmText='Delete Course'
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

export default CourseActions