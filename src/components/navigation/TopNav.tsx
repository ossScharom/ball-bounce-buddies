import React from 'react'
import { useSession } from 'next-auth/react'
import Signin from '../auth/Signin'
import Signout from '../auth/Signout'

type Props = {}

export default function Navbar({}: Props) {
  const {data: session, status} = useSession()
  return (
        <div className="navbar w-full min-h-fit flex-col gap-1 md:flex-row bg-base-300">
          <div className="mx-2 md:grow grow-0 px-2 text-2xl">
            Ball
            Bounce
            Buddies
          </div>
          {status === "unauthenticated" ? <Signin/> : <Signout/>}
        </div>
  )
}