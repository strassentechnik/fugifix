import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import { config } from 'config'
import Slider from 'react-rangeslider'
import styles from './ProductFinder.scss'
import classNames from 'classnames'

export default class ProductFinder extends React.Component {
  static propTypes = {
    // data: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      weight: 0.3,
      width: 10
    }
  }

  handleWeightChange = (weight) => {
    console.log(this.state)
    this.setState({
      weight: weight
    });
  }

  handleWidthChange = (width) => {
    this.setState({
      width: width
    });
  }

  render () {
    // const { data } = this.props
    // const wrapperStyle = classNames(styles.productWrapper, styles[`product--${data.color}`])

    console.log(this.state)

    return (
      <div>
        <div onClick={this.handleWeightChange.bind(this, 0.3)}>0,3 t</div>
        <div onClick={this.handleWeightChange.bind(this, 7.5)}>7,5 t</div>
        <div onClick={this.handleWeightChange.bind(this, 25)}>25 t</div>
        <div onClick={this.handleWeightChange.bind(this, 40)}>40 t</div>
        <Slider
          min={5}
          max={50}
          step={5}
          value={this.state.width}
          orientation="horizontal"
          onChange={this.handleWidthChange} />
        <div>{this.state.width}</div>
      </div>
    )
  }

}
