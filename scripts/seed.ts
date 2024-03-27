const { PrismaClient } = require("@prisma/client")

const db = new PrismaClient()
const main = async () =>{
    try {
        const result = await db.category.createMany({
            data: [
                {name: "Informational technology"},
                {name: "Software development"},
                {name: "Hardware development"},
                {name: "Cybersecurity"},
                {name: "Cloud computing"},
                {name: "Blockchain"},
                {name: "Data science"},
                {name: "Web development"},
                {name: "Mobile development"},
                {name: "Artificial intelligence"},
                {name: "Computer graphics"},
                {name: "Software engineering"},
                {name: "Software testing"},
                {name: "Music"},
                {name: "Photography"},
                {name: "Video games"},
                {name: "Virtual reality"},
                {name: "Augmented reality"},
                {name: "3D printing"},
                {name: "Game development"},
                {name: "Gaming"},
                {name: "Game design"},
                {name: "Game art"},
                {name: "Sports"},
                {name: "Music production"},
            ],
        })
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}

main()