import { Link } from 'react-router-dom'
import { navLinks } from './header.data'
import styles from './Header.module.scss'
import { useEffect, useState } from 'react'

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop

  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight

  const scrolled = winScroll / height
  // console.log(scrolled)
  // console.log(height)

  useEffect(() => {
    let scrollTimeout: any

    const handleScroll = () => {
      // if(window.screenY)

      cancelAnimationFrame(scrollTimeout)

      scrollTimeout = requestAnimationFrame(() => {
        const scrolled = window.scrollY > 0
        setIsScrolled(scrolled)
      })
    }

    document.addEventListener('scroll', handleScroll)

    return () => {
      document.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(scrollTimeout)
    }
  }, [])

  useEffect(() => {
    const logo = document.querySelector('.logo')

    if (isScrolled) {
      logo?.classList.add(styles.stickyLogo)
    } else {
      logo?.classList.remove(styles.stickyLogo)
    }
  }, [isScrolled])

  return (
    <>
      <header
        className={`${isScrolled ? styles.stickyHeader : ''} ${styles.header} ${
          isScrolled ? styles.scrolled : ''
        }`}
      >
        <div>
          <Link to="/">
            <img
              className={isScrolled ? styles.stickyLogo : styles.logo}
              src="https://st2.depositphotos.com/6789684/12262/v/450/depositphotos_122620866-stock-illustration-illustration-of-flat-icon.jpg"
              alt="Logo"
              aria-label="The website's logo"
            />
          </Link>
        </div>
      </header>
      <nav className={styles.headerMenuNav}>
        <ul>
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link to="#">{link.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
