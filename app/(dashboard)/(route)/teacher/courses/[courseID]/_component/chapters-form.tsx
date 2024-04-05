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
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Chapter, Course } from "@prisma/client";

interface ChapterFormProps {
    initialData: Course & { chapters: Chapter[] };
    courseId: string;
};

const formSchema = z.object({
    chapter: z.string().min(1, {
        message: "Chapter is required",
    }),
});

export const ChapterForm: React.FC<ChapterFormProps> = ({ initialData, courseId }) => {
    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            chapter: initialData.chapters[0].id ?? "",
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
        try {
            await axios.patch(`/api/courses/${courseId}`, values);
            toast({
                title: "",
                description: <p className='text-green-600' >Course chapter updated successfully</p >,
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
                <h3 className="text-base">Course chapter</h3>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing((prev) => !prev)}
                    disabled={isSubmitting}
                >
                    {
                        isEditing ? <span>Cancel</span> : <><Pencil className="mr-2 h-4 w-4" /> Edit Chapter</>
                    }
                </Button>
            </div>
            {
                !isEditing ?
                    <p className={`text-sm mt-2 ${!initialData.chapters && "text-neutral-500 italic"}`}>{initialData.chapters[0].title ?? "No Chapter provided"}</p>
                    : <Form {...form}>
                        <FormField
                            control={form.control}
                            name="chapter"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Chapter</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="e.g. This course is about.."
                                            disabled={isSubmitting || !isEditing}
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