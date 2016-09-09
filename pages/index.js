import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import DocumentTitle from 'react-document-title'
import { config } from 'config'
import content from '../content.yaml'

export default class Index extends React.Component {
  render () {
    const properties = content.products.belastbar.props.map((text, i) => {
      return <li key={i}>{text}</li>
    })

    return (
      <DocumentTitle title={config.siteTitle}>
        <div>
          <div className="grid">
            <div className="column">
              <img src={prefixLink('/images/feucht.svg')}/>
              <img src={prefixLink('/images/frost.svg')}/>
              <img src={prefixLink('/images/unkraut.svg')}/>
            </div>
            <div className="column">
              <h1>
                Fugi-Fix "{content.products.belastbar.title}"
              </h1>
              <ul>
                {properties}
              </ul>
            </div>
          </div>

          <div className="grid">
            <div className="column">
              A
            </div>
            <div className="column">
              <h2>
                Was ist fugi-fix?
              </h2>
              <p>{content.general.what}</p>
            </div>
          </div>
        </div>
      </DocumentTitle>
    )
  }
}
