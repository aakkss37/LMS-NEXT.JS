"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
// import FileUpload from "@/components/CustomComponent/file-upload";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";

interface ImageFormProps {
    initialData: {
        imageUrl: string | null;
    };
    courseId: string;
};
interface CloudinaryUploadWidgetInfo {
    event: string;
    info: {
        secure_url: string;
    };
}

const formSchema = z.object({
    imageUrl: z.string().min(1, {
        message: "Image is required",
    }),
});

export const ImageForm: React.FC<ImageFormProps> = ({ initialData, courseId }) => {
    // const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            imageUrl: initialData.imageUrl ?? "",
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
        try {
            await axios.patch(`/api/courses/${courseId}`, values);
            toast({
                title: "",
                description: <p className='text-green-600' >Course image updated successfully</p >,
            })
            // setIsEditing(false);
            router.refresh();
        } catch (error: any | Error) {
            toast({
                title: ``,
                description: <p className='text-red-500' >Error: {error.message}</p>,
            })
        }
    }
    // console.log(initialData.imageUrl)
    return (
        <div className="mt-6 border bg-neutral-50 rounded-md p-4">
            <div className="font-medium flex item-center justify-between my-2">
                <h3 className="text-base">Course image</h3>
                <CldUploadButton
                    options={{ multiple: false }}
                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
                    onUpload={(resp: CloudinaryUploadWidgetInfo | any) => {
                        if (!resp || resp.event != "success") {
                            toast({
                                description: <p className='text-red-500'>Error: Something went wrong</p>,
                            });
                        } else {
                            onSubmit({
                                imageUrl: resp.info.secure_url, // Now TypeScript knows `secure_url` exists
                            });
                        }
                    }}
                >
                    {
                        !initialData.imageUrl ?
                            <span className="flex items-center text-sm">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                <span>
                                    Add image
                                </span>

                            </span> :
                            <span className="flex items-center text-sm">
                                <Pencil className="mr-2 h-4 w-4" />
                                <span>
                                    Edit image
                                </span>
                            </span>
                    }
                </CldUploadButton>
            </div>
            {
                !initialData.imageUrl ?
                    <div className="flex items-center justify-center h-72 bg-slate-200 rounded-md">
                        <ImageIcon className="h-14 w-14 text-neutral-300" />
                    </div>
                    : initialData.imageUrl
                    && <div className="relative aspect-video mt-2">
                        <Image
                            alt="Upload"
                            fill
                            className="object-cover rounded-md"
                            src={initialData.imageUrl as string}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
            }
        </div>
    )
}