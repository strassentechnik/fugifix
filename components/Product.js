import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import { config } from 'config'
import styles from './Product.module.scss'
import classNames from 'classnames'

export default class Product extends React.Component {
  static propTypes = {
    data: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = { moreInfo: false }
  }

  handleMoreInfo = () => {
    const { data } = this.props

    this.setState({
      moreInfo: !this.state.moreInfo
    })
  }

  render () {
    const { data } = this.props
    const wrapperStyle = classNames(styles.productWrapper, styles[`product--${data.color}`])

    return (
      <div className={wrapperStyle}>
        <div className={styles.product}>
          <div className={styles.signets}>
            <img src={prefixLink('/images/feucht.svg')} className={styles.signet}/>
            <img src={prefixLink('/images/frost.svg')} className={styles.signet}/>
            <img src={prefixLink('/images/unkraut.svg')} className={styles.signet}/>
          </div>
          <div className={styles.content}>
            <img src={prefixLink(data.image)}/>
            <h1>
              {data.title}
            </h1>
            { this.state.moreInfo ? this.renderMoreInfo() : this.renderInfo()}
          </div>
        </div>
      </div>
    )
  }

  renderInfo() {
    const { data } = this.props

    return (
      <div>
        <ul className={styles.properties}>
          {data.content.gain.map((text, i) => <li key={i}>{text}</li>)}
        </ul>
        <button type="button" className="btn" onClick={this.handleMoreInfo}>mehr Infos &rang;</button>
        <button type="button" className="btn" onClick={this.handleMoreInfo}>Verbrauch berechnen &rang;</button>
      </div>
    )
  }

  renderMoreInfo() {
    const { data } = this.props

    return (
      <div>
        <h2>Allgemein</h2>
        <p>{data.content.general}</p>

        <h2>Anwendungsbereiche</h2>
        <ul className={styles.properties}>
          {data.content.area.map((text, i) => <li key={i}>{text}</li>)}
        </ul>

        <h2>Vorteile</h2>
        <ul className={styles.properties}>
          {data.content.gain.map((text, i) => <li key={i}>{text}</li>)}
        </ul>

        <h2>Lieferform</h2>
        <ul className={styles.properties}>
          {data.content.deliver.map((text, i) => <li key={i}>{text}</li>)}
        </ul>

        <button type="button" className="btn" onClick={this.handleMoreInfo}>&lang; weniger Infos</button>
      </div>
    )
  }
}
