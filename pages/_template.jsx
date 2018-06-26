import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import '../css/main'
import '../css/markdown-styles'
import styles from './_template.module.scss'
import MediaQuery from 'react-responsive'

module.exports = React.createClass({
  propTypes () {
    return {
      children: React.PropTypes.any,
    }
  },
  render () {
    return (
      <div>
        <header className={styles.header}>
          <h1>Fugi-Fix - Pflasterfugenmörtel</h1>
          <Link to={prefixLink('/')}>
            <img src={prefixLink('/logo.svg')} className={styles.logo} />
          </Link>
          <a href="https://www.facebook.com/fugifix" target="_blank" className={styles.facebook}>
            <MediaQuery query="(min-width: 48em)">
              <img src={prefixLink('/images/facebook.svg')} />
            </MediaQuery>
            <MediaQuery query="(max-width: 767px)">
              <img src={prefixLink('/images/facebook.svg')} />
            </MediaQuery>
          </a>
        </header>
        {this.props.children}
        <footer className={styles.footer}>
          <Link to={prefixLink('/')}>&copy; fugi-fix.de</Link>
          <Link to={prefixLink('/impressum/')}>Impressum & Datenschutz</Link>
          <Link to={prefixLink('/agbs/')}>AGBs</Link>
        </footer>
      </div>
    )
  },
})
