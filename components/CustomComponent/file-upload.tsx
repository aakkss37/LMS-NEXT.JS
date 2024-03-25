// "use Client"
// import React from 'react'
// import { ourFileRouter } from '@/app/api/uploadthing/core';
// import { UploadDropzone } from '@/lib/uploadthing';
// import { toast } from '../ui/use-toast';

// interface FileUploadProps {
//     onChange: (url?: string) => void;
//     endPoint: keyof typeof ourFileRouter
// }

// const FileUpload: React.FC<FileUploadProps> = ({ onChange, endPoint }) => {
//     return (
//         <div>
//             <UploadDropzone
//                 endpoint={endPoint}
//                 onClientUploadComplete={(resp) => onChange(resp[0].url)}
//                 onUploadError={(error: Error | any) => {
//                     toast({
//                         description: <p className='text-red-500' >Error: {error.message}</p>,
//                     })
//                 }}
//                 className='h-72 p-4 '
//                 appearance={{
//                     // container: "",
//                     uploadIcon: "text-neutral-600",
//                     label: "",
//                     allowedContent: "",
//                     button: "bg-neutral-700 hover:bg-neutral-600 text-white p-3 text-sm",
//                 }}
//             />
//         </div>
//     )
// }

// export default FileUpload