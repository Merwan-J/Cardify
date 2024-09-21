import Link from 'next/link'

export const Footer = () => {
  return (
    <div className='flex justify-center gap-1 bg-background-secondary p-2'>
      Made with &#x2661; By{' '}
      <Link
        href={'https://merwanj.me'}
        className='bg-span-bg bg-clip-text font-bold '
      >
        {' '}
        Merwan Juneydi
      </Link>
    </div>
  )
}
