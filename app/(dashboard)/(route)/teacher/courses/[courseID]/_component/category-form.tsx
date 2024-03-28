"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Course } from "@prisma/client";
import { Textarea } from "@/components/ui/textarea";
import { Combobox } from "@/components/ui/combobox";

interface CategoryFormProps {
    initialData: Course;
    courseId: string;
    options: { label: string; id: string }[]
};

const formSchema = z.object({
    categoryID: z.string().min(1)
});

export const CategoryForm: React.FC<CategoryFormProps> = ({ initialData, courseId, options }) => {
    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();
    const selectedOption = options.find((option) => option.id === initialData.categoryID);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            categoryID: initialData.categoryID ?? "",
        },
    });
    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
        try {
            await axios.patch(`/api/courses/${courseId}`, { categoryID: values.categoryID });
            toast({
                title: "",
                description: <p className='text-green-600' >Course title updated successfully</p >,
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
                <h3 className="text-base">Course Category</h3>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing((prev) => !prev)}
                    disabled={isSubmitting}
                >
                    {
                        isEditing ? <span>Cancel</span> : <><Pencil className="mr-2 h-4 w-4" /> Edit category</>
                    }
                </Button>
            </div>
            {
                !isEditing ?
                    <p className={`text-sm mt-2 ${!initialData.categoryID && "text-neutral-500 italic"}`}>{selectedOption ? selectedOption?.label : "No description provided"}</p>
                    : <Form {...form}>
                        <FormField
                            control={form.control}
                            name="categoryID"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Combobox
                                            options={options}
                                            id={initialData.categoryID ?? ""}
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