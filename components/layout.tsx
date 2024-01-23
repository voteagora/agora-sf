
import Meta from './meta'
import { Analytics } from '@vercel/analytics/react';

type Props = {
  preview?: boolean
  children: React.ReactNode
}

const Layout = ({ preview, children }: Props) => {
  return (
    <>
      <Meta />
      <div className="min-h-screen bg-stone-100">
        <main>{children}</main>
      </div>
      <Analytics />
    </>
  )
}

export default Layout
