import Head from 'next/head'
import { ReactNode } from 'react'
import styles from 'styles/Home.module.scss'
import Navbar from 'components/shared/navbar'

interface PageLayoutProps {
  title: string
  children: ReactNode
}

const PageLayout = ({ title, children }: PageLayoutProps) => {
  return (
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
}

export default PageLayout
