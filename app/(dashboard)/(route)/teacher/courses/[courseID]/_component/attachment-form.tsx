"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { File, PlusCircle, Trash } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
// import FileUpload from "@/components/CustomComponent/file-upload";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import { Attachment, Course } from "@prisma/client";
import Link from "next/link";

interface AttachmentFormProps {
    initialData: Course & { attachments: Attachment[] };
    courseId: string;
};
interface CloudinaryUploadWidgetInfo {
    event: string;
    info: {
        secure_url: string;
    };
}

const formSchema = z.object({
    url: z.string().min(1),
});

export const AttachmentForm: React.FC<AttachmentFormProps> = ({ initialData, courseId }) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
        try {
            setIsLoading(true)
            await axios.post(`/api/courses/${courseId}/attachments`, values);
            toast({
                title: "",
                description: <p className='text-green-600' >Course attachment updated successfully</p >,
            })
            setIsLoading(false)
            router.refresh();
        } catch (error: any | Error) {
            setIsLoading(false)
            toast({
                title: ``,
                description: <p className='text-red-500' >Error: {error.message}</p>,
            })
        }
    }
    console.log(initialData.attachments)
    return (
        <div className="mt-6 border bg-neutral-50 rounded-md p-4">
            <div className="font-medium flex item-center justify-between my-2">
                <h3 className="text-base">Course attachment</h3>
                <CldUploadButton
                    options={{ multiple: true }}
                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
                    onUpload={(resp: CloudinaryUploadWidgetInfo | any) => {
                        if (!resp || resp.event != "success") {
                            toast({
                                description: <p className='text-red-500'>Error: Something went wrong</p>,
                            });
                        } else {
                            onSubmit({
                                url: resp.info.secure_url, // Now TypeScript knows `secure_url` exists
                            });
                        }
                    }}
                >
                    <span className="flex items-center text-sm">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        <span>
                            Add attachment
                        </span>

                    </span>
                </CldUploadButton>
            </div>
            {
                initialData.attachments.length === 0 ?
                    <div className="flex items-center justify-center h-72 bg-slate-200 rounded-md">
                        <File className="h-14 w-14 text-neutral-300" />
                    </div>
                    : initialData.attachments.map((attachment, index) => {
                        return (
                            <div
                                key={index}
                                className="flex items-center p-3 my-1 w-full bg-neutral-100 border text-sm border-slate-200 text-neutral-600 rounded-md"
                            >
                                <File className="h-4 w-4 mr-2 flex-shrink-0" />
                                <Link href={attachment.url}>{attachment.name}</Link>
                                <Trash className=" ml-auto mr-2 h-4 w-4" />
                            </div>
                        )
                    })
            }
        </div>
    )
}