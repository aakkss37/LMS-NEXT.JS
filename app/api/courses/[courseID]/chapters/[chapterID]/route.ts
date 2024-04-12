import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";

const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID, // This is the default and can be omitted
  tokenSecret: process.env.MUX_TOKEN_SECRET, // This is the default and can be omitted
});

export async function PATCH(req: Request, {params}: {params: {courseID: string; chapterID: string}}) {
    try {
        const { userId } = auth()
        if (!userId) return new NextResponse("Unauthorized", { status: 401 })
        const courseOwner = await db.course.findUnique({
            where: {
                id: params.courseID,
                userId: userId,
            },
        })
        if (!courseOwner) return new NextResponse("Unauthorized", { status: 401 })
        const {isPublished, ...body} = await req.json()
        if (!isPublished) {
            const publishedChapters = await db.chapter.findMany({
                where: {
                    courseId: params.courseID,
                    isPublished: true
                }
            })
            if (!publishedChapters.length) {
                await db.course.update({
                    where: {
                        id: params.courseID
                    },
                    data: {
                        isPublished: false
                    }
                })
            }
        }
        const chapter = await db.chapter.update({
            where: {
                courseId: params.courseID,
                id: params.chapterID,
            },
            data: {
                ...body,
                isPublished
            }
        })

        if (body.videoUrl) {
            const existingMuxData = await db.muxData.findFirst({
                where: {
                    chapterId: params.chapterID
                }
            })
            if(existingMuxData) {
                await mux.video.assets.delete(existingMuxData.assetId)
                await db.muxData.delete({
                    where: {
                        chapterId: params.chapterID
                    }
                })
                console.log("******mux video assets deleted")
            }
            const videoAsset: Mux.Video.AssetCreateParams = {
                input: [{url: body.videoUrl}],
                playback_policy: ['public'],
            };
            const asset: Mux.Video.Asset = await mux.video.assets.create(videoAsset);
            console.log("******mux video assets:", asset)
            console.log("******mux video assets created")
            await db.muxData.create({
                data: {
                    assetId: asset.id,
                    chapterId: params.chapterID,
                    playBackId: asset.playback_ids?.[0]?.id
                }
            })
        }
        return NextResponse.json(chapter, { status: 200 })

    } catch (error: Error | any) {
        console.log("[COURSES_CHAPTERS] ==>>", error)
        return new NextResponse(error.message, { status: 500 })
    }

}

export async function DELETE(req: Request, {params}: {params: {courseID: string; chapterID: string}}) {
    try {
        const { userId } = auth()
        if (!userId) return new NextResponse("Unauthorized", { status: 401 })
        const courseOwner = await db.course.findUnique({
            where: {
                id: params.courseID,
                userId: userId,
            },
        })
        if (!courseOwner) return new NextResponse("Unauthorized", { status: 401 })
        
        
        const chapter = await db.chapter.findUnique({
            where: {
                courseId: params.courseID,
                id: params.chapterID,
            },
        })
        if (!chapter) return new NextResponse("Chapter not found", { status: 404 })

        //**** delete video asset
        if (chapter.videoUrl) {
            const existingMuxData = await db.muxData.findFirst({
                where: {
                    chapterId: params.chapterID
                }
            })
            if(existingMuxData) {
                await mux.video.assets.delete(existingMuxData.assetId)
                await db.muxData.delete({
                    where: {
                        id: existingMuxData.id
                    }
                })
                console.log("******mux video assets deleted")
            }
        }
        //**** delete chapter
        await db.chapter.delete({
            where: {
                courseId: params.courseID,
                id: params.chapterID,
            },
        })

        // **** unpublish the course if there is no published chapter left
        const publishedChapters = await db.chapter.findMany({
            where: {
                courseId: params.courseID,
                isPublished: true
            }
        })
        if (publishedChapters.length === 0) {
            await db.course.update({
                where: {
                    id: params.courseID
                },
                data: {
                    isPublished: false
                }
            })
        } 

        return NextResponse.json(chapter, { status: 200 })

    } catch (error: Error | any) {
        console.log("[COURSES_CHAPTERS_DELETE] ==>>", error)
        return new NextResponse(error.message, { status: 500 })
    }

}