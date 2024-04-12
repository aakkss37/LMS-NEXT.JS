import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, {params}: {params: {courseID: string}}) {
    try {
        const { userId } = auth()
        if (!userId) return new NextResponse("Unauthorized", { status: 401 })
        const values = await req.json()

        console.log("Values===>>>>: ", values)
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