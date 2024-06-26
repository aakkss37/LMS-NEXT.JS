"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Chapter, Course } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import ChaptersList from "./chapters-list";

interface ChapterFormProps {
    initialData: Course & { chapters: Chapter[] };
    courseId: string;
};

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required",
    }),
});

export const ChapterForm: React.FC<ChapterFormProps> = ({ initialData, courseId }) => {
    const [isCreating, setIsCreating] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        // console.log(values)
        try {
            setIsUpdating(true);
            await axios.post(`/api/courses/${courseId}/chapters`, values);
            toast({
                title: "",
                description: <p className='text-green-600' >Course chapter updated successfully</p >,
            })
            setIsUpdating(false);
            window.location.reload();
        } catch (error: any | Error) {
            setIsUpdating(false);
            toast({
                title: ``,
                description: <p className='text-red-500' >Error: {error.message}</p>,
            })
        }
    }

    const onReorder = async (updateData: { id: string; position: number }[]) => {
        try {
            setIsUpdating(true);
            await axios.post(`/api/courses/${courseId}/chapters/reorder`, updateData);
            toast({
                title: "",
                description: <p className='text-green-600' >Course chapters reordered successfully</p >,
            })
            router.refresh();
            setIsUpdating(false);
        } catch (error: any | Error) {
            setIsUpdating(false);
            toast({
                title: ``,
                description: <p className='text-red-500' >Error: {error.message}</p>,
            })
        }
    }

    const onEdit = (id: string) => {
        router.push(`/teacher/courses/${courseId}/chapters/${id}`)
    }
    return (
        <div className="mt-6 border bg-neutral-50 rounded-md p-4">
            <div className="font-medium flex item-center justify-between">
                <h3 className="text-base">Course chapter</h3>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsCreating((prev) => !prev)}
                    disabled={isSubmitting}
                >
                    {
                        isCreating ? <span>Cancel</span> : <><PlusCircle className="mr-2 h-4 w-4" /> Add Chapter</>
                    }
                </Button>
            </div>
            {
                isCreating &&
                <Form {...form}>
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Chapter</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="e.g. Course introduction.."
                                        disabled={isSubmitting || !isCreating}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-end mt-4">
                        <Button
                            type="submit"
                            variant={"default"}
                            disabled={isSubmitting || !isValid}
                            onClick={() => onSubmit(form.getValues())}
                        >
                            Create
                        </Button>
                    </div>
                </Form>
            }
            {
                !isCreating && (
                    <>
                        <div className={cn(
                            "text-sm mt-2",
                            !initialData.chapters.length && "text-slate-500 italic"
                        )}>
                            {!initialData.chapters.length && "No chapters yet"}
                            <ChaptersList
                                items={initialData.chapters ?? []}
                                onEdit={onEdit}
                                onReorder={onReorder}
                            />
                        </div>
                        <p className="text-sm text-muted-foreground mt-4">Drag and drop to reorder the chapters</p>
                    </>
                )
            }
        </div>
    )
}