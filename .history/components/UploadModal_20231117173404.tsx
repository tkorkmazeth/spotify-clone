'use client'

import React, { useState } from 'react'
import Modal from './Modal'
import useUploadModal from '@/hooks/useUploadModal'
import { FieldValues, SubmitHandler, useForm, } from 'react-hook-form'
import Input from './Input'

const UploadModal = () => {
    const [isLoading, setIsLoading] = useState<boolean>()
    const uploadModal = useUploadModal()

    const {register, handleSubmit, reset} = useForm<FieldValues>({
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

    const onSubmit: SubmitHandler<FieldValues> = async () => {
        // Upload to supabase
    }
  return (
    <Modal title='Add a song'
    description='Upload an mp3 file'
    isOpen={uploadModal.isOpen}
    onChange={onChange}
    >
        <form onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-y-4'
        >
            <Input id='title'
            disabled={isLoading}
            {...register('title', {required: true})}
            placeholder='Song Title'
            />
            <Input id='author'
            disabled={isLoading}
            {...register('author', {required: true})}
            placeholder='Song Author'
            />
            <div>
                <div className='pb-1'>
                    Select a song file
                </div>
                <Input id='song' type='file'
                accept='.mp3'
                    disabled={isLoading}
                    {...register('song', {required: true})}
                    placeholder='Song Author'
                />  
            </div>
        </form>
    </Modal>
  )
}

export default UploadModal