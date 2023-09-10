'use client'

import { SET_INTENTION_MODAL, useModal } from '@/hooks/useModal'
import SetIntentionModal from '../modals/SetIntentionModal'

export default function ModalProvider() {
  const { isOpen, type } = useModal()
  if (isOpen)
    return <>{type === SET_INTENTION_MODAL && <SetIntentionModal />}</>
}
