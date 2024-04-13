import {create} from 'zustand'

interface ConfettiStore {
    isOpen: boolean;
    openConfetti: () => void;
    closeConfetti: () => void;
}

export const useConfettiStore = create<ConfettiStore>((set) => ({
    isOpen: false,
    openConfetti: () => set({isOpen: true}),
    closeConfetti: () => set({isOpen: false}),
}))