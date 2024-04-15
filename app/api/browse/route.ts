import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { userId } = auth()
        // console.log(userId)
        if (!userId) return new NextResponse("Unauthorized", { status: 401 })
        const searchParams = req.nextUrl.searchParams
        const searchQuery = searchParams.get("searchCourse")
        const categoryQuery = searchParams.get("category")
        console.log("query: ", searchQuery)

        const filteredCourse = searchQuery && !categoryQuery ? await db.course.findMany({
            where: {
                title: { contains: searchQuery},
            }
        }) : categoryQuery && !searchQuery ? await db.course.findMany({
            where: {
                categoryID: { contains: categoryQuery, not: null  }
        }}) : categoryQuery && searchQuery ? await db.course.findMany({
            where: {
                title: { contains: searchQuery },
                categoryID: { contains: categoryQuery, not: null  }
        }}) :  await db.course.findMany()

        return NextResponse.json(filteredCourse , { status: 201 })

    } catch (error: Error | any) {
        console.log("[COURSES SEARCH] ==>>", error)
        return new NextResponse(error.message, { status: 500 })
    }
}

