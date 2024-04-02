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
        const attachment = await db.attachment.create({
            data: {
                name: body.url.split("/").pop(),
                courseId: params.courseID,
                ...body
            }
        })

    console.log("Updated course: ", attachment)
    return NextResponse.json(attachment, { status: 200 })
    } catch (error: Error | any) {
        console.log("[COURSES_ATTACHMENTS] ==>>", error)
        return new NextResponse(error.message, { status: 500 })
    }
}