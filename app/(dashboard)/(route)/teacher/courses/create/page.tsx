import React from 'react'
import TitleForm from './_component/titleForm'


const CreateCoursePage: React.FC = () => {


    return (
        <main className='h-full p-4 max-w-5xl mx-auto flex md:justify-center md:items-center'>
            <div>
                <h1 className='text-2xl '>Name your course</h1>
                <p className='text-sm text-slate-600'>What would you like to name your course? Don&apos;t worry, you can change it later. </p>
                <TitleForm />
            </div>
        </main>
    )
}

export default CreateCoursePage