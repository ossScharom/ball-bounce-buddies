import React from 'react'
import { Button } from 'react-daisyui'

type Props = {sportPlaceId: string}

export default function ObserveButton({sportPlaceId}: Props) {

  return (
        <Button className="btn-primary btn-sm w-full">Observe</Button>
  )
}