'use client'

import React from 'react'
import Modal from './Modal'
import useUploadModal from '@/hooks/useUploadModal'
import { useForm } from 'react-hook-form'

const UploadModal = () => {
    const uploadModal = useUploadModal()

    const {register, handleSubmit, reset} = useForm({
        defaultValues:{
            author:'',
            title:'',
            song:null,
            image:null
        }
    })

    const onChange = (open: boolean) => {
        if(!open) {
            reset()
            uploadModal.onClose()
        }
    }
  return (
    <Modal title='Add a song'
    description='Upload an mp3 file'
    isOpen={uploadModal.isOpen}
    onChange={onChange}
    >
        Form
    </Modal>
  )
}

export default UploadModal