import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'
import { Tooltip, Avatar, Button } from 'react-daisyui'

type Props = {
  userSessionData: Session
}

export default function UserProfileIcon({userSessionData}: Props) {
  
  return (
    <div className='place-self-end self-center'>
      <Avatar className='shadow-md w-fit shadow-white cursor-pointer ring ring-primary rounded-full ring-offset-base-100 ring-offset-2'>
        <Image  className='rounded-full' width={30} height={30} alt='Profile picture'  src={userSessionData.user.image}/>
      </Avatar>
    </div>
    // <Button onClick={() => signOut()}>Sign-out</Button>
  )
}