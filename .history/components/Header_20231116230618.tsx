'use client';

import { useRouter } from 'next/navigation'
import { twMerge } from 'tailwind-merge';
import {RxCaretLeft, RxCaretRight} from 'react-icons/rx'
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import Button from './Button';
import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

interface HeaderProps {
    children: React.ReactNode
    className?:string
}

const Header:React.FC<HeaderProps> = ({children,className}) => {
    const router = useRouter()
    const authModal = useAuthModal()

    const supabaseClient = useSupabaseClient()
    const {user} = useUser()

    const handleLogout = async () => {
        const {error} = await supabaseClient.auth.signOut()

        router.refresh()
    }

  return (
    <div className={twMerge(`
    h-fit
    bg-gradient-to-b
    from-emerald-800
    p-6
    `, 
    className
    )}>
        <div className='
        w-full
        mb-4
        flex
        items-center
        justify-between
        '>
            <div className='
            hidden
            md:flex
            gap-x-2
            items-center
            '>
                <button
                onClick={() => router.back()}
                className='
                bg-black
                rounded-full
                flex
                items-center
                justify-center
                hover:opacity-75
                transition
                '
                >
                    <RxCaretLeft size={35} className='text-white'/>
                </button>
                <button
                onClick={() => router.forward()}
                className='
                bg-black
                rounded-full
                flex
                items-center
                justify-center
                hover:opacity-75
                transition
                '
                >
                    <RxCaretRight size={35} className='text-white'/>
                </button>
            </div>
            <div className='flex md:hidden gap-x-2 items-center'>
                <button className='
                rounded-full
                p-2
                bg-white
                flex
                items-center
                justify-center
                hover:opacity-75
                transtion
                '>
                    <HiHome size={26} className='text-black'/>
                </button>
                <button className='
                rounded-full
                p-2
                bg-white
                flex
                items-center
                justify-center
                hover:opacity-75
                transtion
                '>
                    <BiSearch size={26} className='text-black'/>
                </button>
            </div>
            <div className='
            flex
            justify-between
            items-center
            gap-x-4
            '>
                {user? (
                    <div>
                        Logged In
                    </div>
                ) : (
                <>
                <div>
                    <Button 
                    className='
                    bg-transparent
                    text-neutral-300
                    font-medium
                    '
                    onClick={authModal.onOpen}

                    >
                        Sign Up
                    </Button>
                </div>
                <div>
                    <Button className='
                    bg-white
                    px-6
                    py-2
                    '
                    onClick={authModal.onOpen}
                    >
                        Log In
                    </Button>
                </div>
                </>
                )}
            </div>
        </div>
        {children}
    </div>
  )
}

export default Header