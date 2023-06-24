import classNames from 'classnames'
import React from 'react'

type Props = {
    children: React.ReactNode,
    active?: boolean
}

export default function BottomNavButton({children, active=false}: Props) {
  return (
    <button className={classNames("text-primary text-3xl p-2", {'active': active})}>{children}</button>
  )
}