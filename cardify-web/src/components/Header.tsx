'use client'
import { FC } from 'react'
import GithubIcon from '../icons/github'
import LogoIcon from '../icons/logo'
import LangSwitcher from './LangSwitcher'
import ThemeSwitch from './ThemeSwitch'
import Button from './Button'
import Link from 'next/link'
import Image from 'next/image'

export const Header = () => {
  return (
    <div className='mx-auto flex max-w-screen-2xl flex-row items-center justify-between p-5'>
      <Link href='/'>
        <div className='flex flex-row items-center'>
          <div className='mb-2 h-14 w-14'>
            <Image src='/logo.png' alt='logo' width={56} height={56} />
          </div>
          <strong className='mx-2 select-none bg-span-bg bg-clip-text text-2xl'>
            Cardify
          </strong>
        </div>
      </Link>
      <div className='flex flex-row items-center gap-3'>
        <Button rounded size='medium' className='bg-span-bg'>
          Get Started
        </Button>{' '}
        <a href='https://github.com/Merwan-J/Cardify' target='_blank'>
          <div className='size-8'>
            <GithubIcon />
          </div>
        </a>
      </div>
    </div>
  )
}
