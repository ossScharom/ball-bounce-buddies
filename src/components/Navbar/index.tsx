import React from 'react'
import Sports from '../Sports'
import { useSession } from 'next-auth/react'
import Signin from '../auth/Signin'
import Signout from '../auth/Signout'

type Props = {}

export default function Navbar({}: Props) {
  const {data: session, status} = useSession()
  return (
        <div className="navbar w-full bg-base-300">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-3" className="btn-ghost btn-square btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 text-2xl">
            🏀Ball⚽Bounce🏓Buddies🏐
          </div>
          <div className="hidden flex-none lg:block">
            <Sports className="menu menu-horizontal"/>
          </div>
          <div>
            {status === "unauthenticated" ? <Signin/> : <Signout/>}
          </div>
        </div>
  )
}