import Head from 'next/head'
import { ReactNode } from 'react'
import styles from 'styles/layout.module.scss'
import Navbar from 'components/shared/navbar'

interface PageProps {
  title: string
  children: ReactNode
}

const Page = ({ title, children }: PageProps) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
    <div className={styles.container}>
      <Navbar />
      <main className={styles.feed}>{children}</main>
    </div>
  </>
)

export default Page
