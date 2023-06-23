import { signOut } from 'next-auth/react'
import React from 'react'
import { Button } from 'react-daisyui'

type Props = {}

export default function Signout({}: Props) {
  return (
    <Button onClick={() => signOut()}>Sign-out</Button>
  )
}