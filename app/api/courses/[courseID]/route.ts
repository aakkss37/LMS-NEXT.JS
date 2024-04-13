import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";

const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID, // This is the default and can be omitted
  tokenSecret: process.env.MUX_TOKEN_SECRET, // This is the default and can be omitted
});

export async function PATCH(req: Request, {params}: {params: {courseID: string}}) {
    try {
        const { userId } = auth()
        if (!userId) return new NextResponse("Unauthorized", { status: 401 })
        const values = await req.json()

        // console.log("Values===>>>>: ", values)
    const updatedCourse = await db.course.update({
        where: {
            id: params.courseID,
            userId: userId,
        },
        data: {
            ...values
        }
    })

    console.log("Updated course: ", updatedCourse)
    return NextResponse.json("OK", { status: 202 })
    } catch (error: Error | any) {
        console.log("[COURSES] ==>>", error)
        return new NextResponse(error.message, { status: 500 })
    }
}

export async function DELETE(req: Request, {params}: {params: {courseID: string}}) {
    try {
        const { userId } = auth()
        if (!userId) return new NextResponse("Unauthorized", { status: 401 })
        const course = await db.course.findUnique({
            where: {
                id: params.courseID
            },
            include: {
                chapters: {
                    include: {
                        muxData: true,
                    }
                }
            }
        })
        if (!course) return new NextResponse("Course not found", { status: 404 })

        for (const chapter of course.chapters) {
            if (chapter.muxData?.assetId) {
                await mux.video.assets.delete(chapter.muxData.assetId);
            }
        }
        const deletedCourse = await db.course.delete({
            where: {
                id: params.courseID,
                userId: userId,
            },
        })
        return NextResponse.json(deletedCourse, { status: 200 })
    } catch (error: Error | any) {
        console.log("[COURSES_DELETE] ==>>", error)
        return new NextResponse(error.message, { status: 500 })
    }
}