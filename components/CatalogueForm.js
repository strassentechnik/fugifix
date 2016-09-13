import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import { config } from 'config'
import styles from './CatalogueForm.module.scss'
import classNames from 'classnames'

export default class CatalogueForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      _subject: 'Katalogbestellung'
    }
  }

  render () {
    return (
      <form action="//mailthis.to/fugifix" method="post" className={styles.form}>
        <div className="row">
          <div className="medium-6">
            <div>
              <label htmlFor="Firma">Firma *</label>
              <input type="text" name="Firma" required={true} />
            </div>
          </div>
          <div className="medium-6">
            <div>
              <label htmlFor="Name">Name *</label>
              <input type="text" name="Name" required={true} />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="medium-6">
            <div>
              <label htmlFor="Strasse">Straße *</label>
              <input type="text" name="Strasse" required={true} />
            </div>
          </div>
          <div className="medium-6">
            <div>
              <label htmlFor="Ort">PLZ / Ort *</label>
              <input type="text" name="Ort" required={true} />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="medium-6">
            <div>
              <label htmlFor="Telefon">Telefon *</label>
              <input type="text" name="Telefon" required={true} />
            </div>
          </div>
          <div className="medium-6">
            <div>
              <label htmlFor="Fax">Fax</label>
              <input type="text" name="Fax" />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="medium-6">
            <div>
              <label htmlFor="Mobil">Mobil</label>
              <input type="text" name="Mobil" />
            </div>
          </div>
          <div className="medium-6">
            <div>
              <label htmlFor="Email">E-Mail</label>
              <input type="email" name="Email" />
            </div>
          </div>
        </div>

        <input type="hidden" name="Thema" value={this.state._subject} />
        <input type="hidden" name="_after" value="http://127.0.0.1:8000" />
        <input type="hidden" name="_subject" value={this.state._subject} />
        <input type="text" name="_honey" value="" style={{display: "none"}} />

        <div className="row">
          <div className="medium-7">
            <div>
              <label htmlFor="Quelle">Wie sind Sie auf uns Aufmerksam geworden?</label>
              <select name="Quelle" required={true}>
                <option value="">Bitte auswählen</option>
                <option value="Suchmaschine">Suchmaschine</option>
                <option value="Empfehlung">Empfehlung</option>
                <option value="Printanzeige">Printanzeige</option>
                <option value="Sonstiges">Sonstiges</option>
              </select>
            </div>
          </div>
          <div className="medium-5 text-right">
            <input type="submit" className="btn" value="Katalog anfordern" />
          </div>
        </div>
        <div className="text-center">Felder mit einem * müssen ausgefüllt werden.</div>
      </form>
    )
  }
}
