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
import { formatPrice } from "@/lib/format";

interface PriceFormProps {
    initialData: Course;
    courseId: string;
};

const formSchema = z.object({
    price: z.coerce.number().min(1, { message: "Price is required" }),
});

export const PriceForm: React.FC<PriceFormProps> = ({ initialData, courseId }) => {
    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            price: initialData.price ?? undefined,
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
        try {
            await axios.patch(`/api/courses/${courseId}`, { price: Number(values.price) });
            toast({
                description: <p className='text-green-600' >Course price updated successfully</p >,
            })
            setIsEditing(false);
            router.refresh();
        } catch (error: any | Error) {
            toast({
                description: <p className='text-red-500' >Error: {error.message}</p>,
            })
        }
    }

    return (
        <div className="mt-6 border bg-neutral-50 rounded-md p-4">
            <div className="font-medium flex item-center justify-between">
                <h3 className="text-base">Course price</h3>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing((prev) => !prev)}
                    disabled={isSubmitting}
                >
                    {
                        isEditing ? <span>Cancel</span> : <><Pencil className="mr-2 h-4 w-4" /> Edit Price</>
                    }
                </Button>
            </div>
            {
                !isEditing ?
                    <p className={`text-sm mt-2 ${!initialData.price && "text-neutral-500 italic"}`}>{formatPrice(initialData.price) ?? "No price provided"}</p>
                    : <Form {...form}>
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Set your course price"
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