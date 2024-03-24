"use client"
import React from 'react'
import axios from 'axios'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { useToast } from '@/components/ui/use-toast'

const formSchema = z.object({
    title: z.string().min(3, { message: 'Name is required' }),
})



const TitleForm: React.FC = () => {
    const router = useRouter()
    const { toast } = useToast()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
        },
    })
    const { isSubmitting, isValid } = form.formState

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const resp = await axios.post('/api/courses', values)
            router.push(`/teacher/courses/${resp.data.id}`)
            console.log(resp.data)
            toast({
                title: '',
                description: <p className='text-green-600'>Your course has been created.</p>,
                variant: 'default',
            })
        } catch (error: any | Error) {
            console.error(error)
            toast({
                title: `ERROR: ${error.code}`,
                description: <p className='text-red-500'>{error.message}</p>,
                // variant: 'destructive',
            })
        }
        console.log(values)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Course Name</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="e.g. Advance NEXT.JS with mySQL" disabled={isSubmitting} />
                            </FormControl>
                            <FormDescription>What are you teaching in this course?</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className='flex items-center gap-x-2'>
                    <Button type="button" variant={"ghost"} >
                        <Link href={"/"}>
                            Cancel
                        </Link>
                    </Button>
                    <Button type="submit" disabled={isSubmitting || !isValid}>
                        Continue
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default TitleForm