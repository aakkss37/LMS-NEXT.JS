import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request, {params}: {params: {courseID: string}}) {
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
        const body = await req.json()
        console.log("BODDDDDYYYYYY &&&&&$$$$$$$", body)
        const lastChapter = await db.chapter.findFirst({
            where: {
                courseId: params.courseID
            },
            orderBy: {
                position: 'desc'
            }
        })
        const newPosition = lastChapter ? lastChapter.position + 1 : 1
        const chapter = await db.chapter.create({
            data: {
                title: body.title,
                courseId: params.courseID,
                position: newPosition,
            }
        })
        return NextResponse.json(chapter, { status: 200 })

    } catch (error: Error | any) {
        console.log("[COURSES_CHAPTERS] ==>>", error)
        return new NextResponse(error.message, { status: 500 })
    }

}