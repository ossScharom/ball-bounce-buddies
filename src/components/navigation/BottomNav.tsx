import React from 'react'
import { BottomNavigation } from 'react-daisyui'
import BottomNavButton from './BottomNavButton'

type Props = {}

export default function BottomNav({}: Props) {
  return (
    <div className="btm-nav relative">
        <BottomNavButton active >🏓</BottomNavButton>
        <BottomNavButton >🏀</BottomNavButton>
        <BottomNavButton >🏐</BottomNavButton>
    </div>
  )
}