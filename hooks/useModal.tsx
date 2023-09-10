import { create } from 'zustand'

export const SET_INTENTION_MODAL = 'setIntention'
export type ModalType = typeof SET_INTENTION_MODAL

interface ModalStore {
  type: ModalType | null
  isOpen: boolean
  onOpen: (type: ModalType) => void
  onClose: () => void
}

export const useModal = create<ModalStore>(set => ({
  type: null,
  isOpen: false,
  onOpen: type => set({ type, isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
