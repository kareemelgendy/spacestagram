import Icon from 'components/shared/icon'
import Link from 'next/link'
import { useEffect } from 'react'
import styles from './navbar.module.scss'

const Navbar = (): JSX.Element => {
  const pages = ['home', 'search', 'likes', 'bookmarks']
  const pageLink = (link: string): string => (link === 'home' ? '/' : link)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      const nav = document.querySelector('nav')
      nav?.classList.toggle(styles.sticky, window.scrollY > 100)
    })
  })

  return (
    <header>
      <nav className={styles.container}>
        <div className={styles.logo}>
          <Link href="/" replace>
            SPACESTAGRAM
          </Link>
        </div>
        <div className={styles.pages}>
          {pages.map((page, key) => (
            <Link key={key} href={`${pageLink(page)}`} replace passHref>
              <Icon name={page} ariaLabel={`Go to ${page} page`} />
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
