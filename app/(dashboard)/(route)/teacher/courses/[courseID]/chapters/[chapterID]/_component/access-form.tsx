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
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Chapter } from "@prisma/client";
import { Checkbox } from "@/components/ui/checkbox"
import { QuillPreview } from "@/components/CustomComponent/quillPreview";

interface ChapterAccessFormProps {
    initialData: Chapter;
    courseId: string;
    chapterId: string;
};

const formSchema = z.object({
    isFree: z.boolean().default(false),
});

export const ChapterAccessForm: React.FC<ChapterAccessFormProps> = ({ initialData, courseId, chapterId }) => {
    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            isFree: initialData.isFree ?? false,
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        // console.log(values)
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
                <h3 className="text-base">Chapter Access</h3>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing((prev) => !prev)}
                    disabled={isSubmitting}
                >
                    {
                        isEditing ? <span>Cancel</span> : <><Pencil className="mr-2 h-4 w-4" /> Edit Accessability</>
                    }
                </Button>
            </div>
            {
                !isEditing ?
                    initialData.isFree ? <p className={`text-sm mt-2 text-neutral-500 italic`}>This chapter is free for preview</p> : <p className={`text-sm mt-2 text-neutral-500 italic`}>This chapter is not free.</p>
                    : <Form {...form}>
                        <FormField
                            control={form.control}
                            name="isFree"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">

                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormLabel>
                                        <FormDescription>
                                            Check this box if you want to make this chapter free for preview.
                                        </FormDescription>
                                    </FormLabel>
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