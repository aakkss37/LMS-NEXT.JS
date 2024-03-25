import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
 
const handleAuth = () =>{
	const {userId} = auth()
	if(!userId) throw new Error("Unauthorized", {cause: "Not logged in"})
	return {userId}
}
 
/**
 * OurFileRouter defines the file routes and their configuration
 * for uploading files.
 *
 * @property courseImage - Route for uploading an image for a course.
 * 		The image must be less than 4MB and there can only be one image per course.
 * @property courseAttachment - Route for uploading attachments for a course.
 * 		The attachment can be one of the following types: text, image, video,
 * 		audio or pdf. There can be multiple attachments per course.
 * @property chapterVideo - Route for uploading a video for a chapter.
 * 		The video must be less than 512GB and there can only be one video per chapter.
 */
export const ourFileRouter = {
	courseImage: f({image: {maxFileSize: "4MB", maxFileCount: 1}})
		.middleware(() => handleAuth())
		.onUploadComplete(() => {
			console.log("Upload complete");
		}),
	courseAttachment: f(["text", "image", "video", "audio", "pdf"])
		.middleware(() => handleAuth())
		.onUploadComplete(() => {
			console.log("Upload complete");
		}),
	chapterVideo: f({video: {maxFileSize: "512GB", maxFileCount: 1}})
		.middleware(() => handleAuth())
		.onUploadComplete(() => {
			console.log("Upload complete");
		}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
