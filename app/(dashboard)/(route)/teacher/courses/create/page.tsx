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


const CreateCoursePage: React.FC = () => {
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
            const resp = await axios.post('/api/course', values)
            router.push(`/teacher/courses/${resp.data.id}`)
        } catch (error: any | Error) {
            console.error(error)
            toast({
                title: `ERROR: ${error.code}`,
                description: `${error.message}`,
                // variant: 'destructive',
            })
        }
        console.log(values)
    }
    return (
        <main className='h-full p-2 max-w-5xl mx-auto flex md:justify-center md:items-center'>
            <div>
                <h1 className='text-2xl '>Name your course</h1>
                <p className='text-sm text-slate-600'>What would you like to name your course? Don&apos;t worry, you can change it later. </p>
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
                            <Link href={"/"}>
                                <Button type="button" variant={"ghost"} >
                                    Cancel
                                </Button>
                            </Link>
                            <Button type="submit" disabled={isSubmitting || !isValid}>
                                Continue
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </main>
    )
}

export default CreateCoursePage