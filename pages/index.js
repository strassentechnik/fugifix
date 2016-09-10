import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import DocumentTitle from 'react-document-title'
import Product from '../components/Product'
import Hexagon from '../components/Hexagon'
import ProductFinder from '../components/ProductFinder'
import { config } from 'config'
import content from '../content.yaml'
import styles from './index.module.scss'
import MediaQuery from 'react-responsive'

export default class Index extends React.Component {

  constructor(props) {
    super(props)
    this.state = { productId: 0, value: 10 }
  }

  handleProductClick = (productId) => {
    this.setState({ productId: productId })
  }

  render () {
    const product = content.products[this.state.productId]

    return (
      <DocumentTitle title={config.siteTitle}>
        <div>
          <Product data={product} />

          <nav className={styles.productNav}>
            {this.renderNavItems()}
          </nav>

          <nav className={styles.nav}>
            <a ref="#">Was ist fugi-fix?</a>
            <a ref="#">Verarbeitung</a>
            <a ref="#">Reinigung</a>
          </nav>

          <div className="grid">
            <div className="column">
              <h2>
                Was ist fugi-fix?
              </h2>
              <p>{content.general.what}</p>
              <ProductFinder />
            </div>
            <div className="column">
              <img src={prefixLink('/images/fugen.svg')} className={styles.fugen}/>
            </div>
          </div>
        </div>
      </DocumentTitle>
    )
  }

  renderNavItems() {
    return content.products.map((p, i) => {
      return (
        <a key={i} onClick={this.handleProductClick.bind(this, i)}>
          <MediaQuery query='(min-width: 48em)'>
            <span className={`bg--${p.color}`}>{p.title}</span>
            <Hexagon color={p.color} active={i === this.state.productId} />
          </MediaQuery>
          <MediaQuery query='(max-width: 767px)'>
            <span className={`bg--${p.color}`}>{p.title}</span>
            <Hexagon width={30} strokeWidth={2} color={p.color} active={i === this.state.productId} />
          </MediaQuery>
        </a>
      )
    })
  }
}
