import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

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
        
        const chapter = await db.chapter.update({
            where: {
                courseId: params.courseID,
                id: params.chapterID,
            },
            data: {
                ...body
            }
        })

        // TODO: handle add videos
        return NextResponse.json(chapter, { status: 200 })

    } catch (error: Error | any) {
        console.log("[COURSES_CHAPTERS] ==>>", error)
        return new NextResponse(error.message, { status: 500 })
    }

}