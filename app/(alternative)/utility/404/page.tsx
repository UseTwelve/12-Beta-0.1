// This is just a demo page, look for the not-found.js file in the app directory. 

export const metadata = {
  title: 'Page Not Found - Twelve',
  description: 'Page description',
}

import Link from 'next/link'
import Image from 'next/image'
import NotFoundImage from '@/public/images/404-illustration.svg'
import NotFoundImageDark from '@/public/images/404-illustration-dark.svg'
import { redirect } from 'next/navigation'

export default function PageNotFound() {
  return redirect('/link-account');
}