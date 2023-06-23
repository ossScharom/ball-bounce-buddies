import React, { ReactHTMLElement } from 'react'

type Props = {
    className: string
    children?: React.ReactNode
}
export default function Sports({className, children}: Props) {
  return (
        <ul className={className}>
            <li className="text-xl">
                <a>Table Tennis</a>
            </li>
            <li className="text-xl">
                <a>Basketball</a>
            </li>
            {children}
        </ul>
  )
}