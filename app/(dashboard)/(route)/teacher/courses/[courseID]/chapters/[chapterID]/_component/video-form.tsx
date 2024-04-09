"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil, PlusCircle, Video } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
// import FileUpload from "@/components/CustomComponent/file-upload";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import { Chapter, MuxData } from "@prisma/client";
import MuxPlayer from '@mux/mux-player-react';


interface ChapterVideoFormProps {
    initialData: Chapter & { muxData?: MuxData | null }
    courseId: string;
    chapterId: string;
};
interface CloudinaryUploadWidgetInfo {
    event: string;
    info: {
        secure_url: string;
    };
}

const formSchema = z.object({
    videoUrl: z.string().min(1),
});

export const ChapterVideoForm: React.FC<ChapterVideoFormProps> = ({ initialData, courseId, chapterId }) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            videoUrl: initialData.videoUrl ?? "",
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
        try {
            setIsLoading(true)
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
            toast({
                title: "",
                description: <p className='text-green-600' >Chapter updated successfully</p >,
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
    // console.log(initialData.videoUrl)
    return (
        <div className="mt-6 border bg-neutral-50 rounded-md p-4">
            <div className="font-medium flex item-center justify-between my-2">
                <h3 className="text-base">Chapter Video</h3>
                <CldUploadButton
                    options={{
                        multiple: false, styles: { container: { width: "100%", backgroundColor: "red" } }, sources: [
                            "local", "camera", "dropbox", "facebook", "google_drive", "url"
                        ],
                        theme: "background-color: red;",
                    }}
                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
                    onUpload={(resp: CloudinaryUploadWidgetInfo | any) => {
                        if (!resp || resp.event != "success") {
                            toast({
                                description: <p className='text-red-500'>Error: Something went wrong</p>,
                            });
                        } else {
                            onSubmit({
                                videoUrl: resp.info.secure_url, // Now TypeScript knows `secure_url` exists
                            });
                        }
                    }}
                >
                    {
                        !initialData.videoUrl ?
                            <span className="flex items-center text-sm">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                <span>
                                    Add video
                                </span>

                            </span> :
                            <span className="flex items-center text-sm">
                                <Pencil className="mr-2 h-4 w-4" />
                                <span>
                                    Edit video
                                </span>
                            </span>
                    }
                </CldUploadButton>
            </div>
            {
                !initialData.videoUrl ?
                    <div className="flex items-center justify-center h-72 bg-slate-200 rounded-md">
                        <Video className="h-14 w-14 text-neutral-300" />
                    </div>
                    : initialData.videoUrl
                    && <div className="relative aspect-video mt-2 ">
                        <MuxPlayer
                            playbackId={initialData.muxData?.playBackId ?? ""}
                            metadata={{
                                video_id: initialData.muxData?.id ?? "",
                            }}
                            streamType="on-demand"
                        />
                    </div>
            }
        </div>
    )
}