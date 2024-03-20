import React from 'react'

type Props = {
    children: React.ReactNode
}

const AuthLayout: React.FC<Props> = ({ children }) => {
    return (
        <div className='h-full w-full flex justify-center items-center'>
            {children}
        </div>
    )
}

export default AuthLayout