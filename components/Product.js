import React from 'react'
import { prefixLink } from 'gatsby-helpers'
import styles from './Product.module.scss'
import classNames from 'classnames'

export default class Product extends React.Component {
  static propTypes = {
    data: React.PropTypes.object.isRequired,
    onCalculate: React.PropTypes.func.isRequired,
    onStopCycle: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = { moreInfo: false }
  }

  handleMoreInfo = () => {
    this.props.onStopCycle()
  }

  handleCalculate = () => {
    this.props.onStopCycle()
    this.props.onCalculate(this.props.data.id)
  }

  render() {
    const { data } = this.props
    const wrapperStyle = classNames(styles.productWrapper, styles[`product--${data.color}`])

    const eigenschaften = data.eigenschaften.map(e => {
      return <img src={prefixLink(`/images/${e}.svg`)} className={styles.signet}/>
    })

    return (
      <div className={wrapperStyle} onClick={this.props.onStopCycle}>
        <div className={styles.product}>
          <div className={styles.signets}>
            {eigenschaften}
          </div>
          <div className={styles.content}>
            <h1>
              {data.title}
            </h1>
            <img src={prefixLink(data.image)}/>

            <ul className={styles.properties}>
              {data.content.gain.map((text, i) => <li key={i}>{text}</li>)}
            </ul>

            {this.renderInfo()}

          </div>
        </div>
      </div>
    )
  }

  renderInfo() {
    const { data } = this.props

    return (
      <div className={styles.actions}>
        <a className="btn" href={prefixLink(data.pdf)} target="_blank"
           onClick={this.handleMoreInfo}>mehr Infos &rang;</a>
        {this.allowCalculation(data.id) ?
          <button type="button" className="btn" onClick={this.handleCalculate}>Verbrauch
            berechnen &rang;</button> : null}
      </div>
    )
  }

  allowCalculation(id) {
    const blockedIds = [0, 7, 8]
    return !blockedIds.includes(id)
  }
}
