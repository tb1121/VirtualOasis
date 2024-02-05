import React from 'react'
import Link from 'next/link'

export default function About() {
  return (
      <div className='flex items-center justify-center text-red-500'>
        <p>This is the About page!</p>
        <Link href='/'>Go Home
        </Link>
      </div>
  )
}
