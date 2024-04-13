"use client"
import React from 'react'
import Confetti from 'react-confetti'
import { useConfettiStore } from '@/hooks/use-confetti'


const ConfettiProvider: React.FC = () => {
    const confetti = useConfettiStore()

    if (!confetti.isOpen) return null

    return (
        <Confetti
            className='pointer-events-none z-50'
            numberOfPieces={500}
            recycle={false}
            onConfettiComplete={() => confetti.closeConfetti()}
        />
    )
}

export default ConfettiProvider