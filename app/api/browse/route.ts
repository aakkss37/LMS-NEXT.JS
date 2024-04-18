import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Course } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { userId } = auth()
        // console.log(userId)
        if (!userId) return new NextResponse("Unauthorized", { status: 401 })
        const searchParams = req.nextUrl.searchParams
        const searchQuery = searchParams.get("search")
        const categoryQuery = searchParams.get("category")
    
        let filteredCourse: Course[] 
        if (searchQuery && !categoryQuery ){
            console.log("only search query")
            filteredCourse = await db.course.findMany({
                where: {
                    title: { contains: searchQuery },
                }
            })
        } else if ( categoryQuery && !searchQuery ) {
            console.log("only category query")
            filteredCourse = await db.course.findMany({
            where: {
                categoryID: { contains: categoryQuery, not: null  }
        }}) 
        } else if ( categoryQuery && searchQuery ) {
            console.log("both search and category query")
            filteredCourse = await db.course.findMany({
            where: {
                title: { contains: searchQuery },
                categoryID: { contains: categoryQuery, not: null  }
            }})
        }  else  filteredCourse= await db.course.findMany()

        console.log("filteredCourse: ", filteredCourse)
        return NextResponse.json(filteredCourse , { status: 200 })

    } catch (error: Error | any) {
        console.log("[COURSES SEARCH] ==>>", error)
        return new NextResponse(error.message, { status: 500 })
    }
}

