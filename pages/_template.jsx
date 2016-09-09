import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import Hexagon from '../utils/hexagon'
import '../css/main'
import '../css/markdown-styles'
import styles from './_template.module.scss'

module.exports = React.createClass({
  propTypes () {
    return {
      children: React.PropTypes.any,
    }
  },
  render () {
    console.log(styles)
    return (
      <div>
        <header className={styles.header}>
          <h1>Fugi-Fix - Pflasterfugenmörtel</h1>
          <img src={prefixLink('/logo.svg')} className={styles.logo}/>
        </header>
        <nav className={styles.nav}>
          <a href="#"><Hexagon /></a>
          <a href="#"><Hexagon /></a>
          <a href="#"><Hexagon /></a>
        </nav>
        {this.props.children}
      </div>
    )
  },
})
