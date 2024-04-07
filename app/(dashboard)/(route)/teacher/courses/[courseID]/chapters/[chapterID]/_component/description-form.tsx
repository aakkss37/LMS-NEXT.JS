"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Chapter } from "@prisma/client";
import { QuillEditor } from "@/components/CustomComponent/quillEditor";
import { QuillPreview } from "@/components/CustomComponent/quillPreview";

interface ChapterDescriptionFormProps {
    initialData: Chapter;
    courseId: string;
    chapterId: string;
};

const formSchema = z.object({
    description: z.string().min(1),
});

export const ChapterDescriptionForm: React.FC<ChapterDescriptionFormProps> = ({ initialData, courseId, chapterId }) => {
    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: initialData.description ?? "",
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
        try {
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
            toast({
                title: "",
                description: <p className='text-green-600' >Chapter description updated successfully</p >,
            })
            setIsEditing(false);
            router.refresh();
        } catch (error: any | Error) {
            toast({
                title: ``,
                description: <p className='text-red-500' >Error: {error.message}</p>,
            })
        }
    }

    return (
        <div className="mt-6 border bg-neutral-50 rounded-md p-4">
            <div className="font-medium flex item-center justify-between">
                <h3 className="text-base">Chapter description</h3>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing((prev) => !prev)}
                    disabled={isSubmitting}
                >
                    {
                        isEditing ? <span>Cancel</span> : <><Pencil className="mr-2 h-4 w-4" /> Edit description</>
                    }
                </Button>
            </div>
            {
                !isEditing ?
                    initialData.description ? <QuillPreview value={initialData.description} /> : <p className={`text-sm mt-2 text-neutral-500 italic`}>No description provided</p>
                    : <Form {...form}>
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <QuillEditor
                                            // value={field.value}
                                            // onChange={field.onChange}
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
                                Save
                            </Button>
                        </div>
                    </Form>
            }
        </div>
    )
}