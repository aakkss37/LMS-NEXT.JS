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
    //    console.log("BODDDDDYYYYYY &&&&&$$$$$$$", body)
        for (let item of body) {
            await db.chapter.update({
                where: {
                    id: item.id
                },
                data: {
                    position: item.position
                }
            })
        }
        return NextResponse.json(body, { status: 200 })

    } catch (error: Error | any) {
        console.log("[COURSES_CHAPTERS] ==>>", error)
        return new NextResponse(error.message, { status: 500 })
    }

}