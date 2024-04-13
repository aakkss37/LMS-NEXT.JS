import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { userId } = auth()
        // console.log(userId)
        const { title } = await req.json()
        if (!userId) return new NextResponse("Unauthorized", { status: 401 })

        const course = await db.course.create({
            data: {
                userId: userId,
                title: title,
            }
        })
        // console.log("Created course: ", course)
        return NextResponse.json(course , { status: 201 })

    } catch (error: Error | any) {
        console.log("[COURSES] ==>>", error)
        return new NextResponse(error.message, { status: 500 })
    }
}

export async function GET(req: NextRequest) {
    try {
        const { userId } = auth()
        // console.log(userId)
        if (!userId) return new NextResponse("Unauthorized", { status: 401 })
        const searchParams = req.nextUrl.searchParams
        const searchQuery = searchParams.get("searchCourse")
        console.log("query: ", searchQuery)
        const filteredCourse = searchQuery ? await db.course.findMany({
            where: {
                userId: userId,
                title: { contains: searchQuery }
            }
        }) : await db.course.findMany()
        return NextResponse.json(filteredCourse , { status: 201 })

    } catch (error: Error | any) {
        console.log("[COURSES SEARCH] ==>>", error)
        return new NextResponse(error.message, { status: 500 })
    }
}


