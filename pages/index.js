import React from 'react';
import { prefixLink } from 'gatsby-helpers';
import DocumentTitle from 'react-document-title';
import Product from '../components/Product';
import Hexagon from '../components/Hexagon';
import ProductFinder from '../components/ProductFinder';
import CatalogueForm from '../components/CatalogueForm';
import CookieBanner from '../components/CookieBanner';
import { config } from 'config';
import content from '../content.yaml';
import styles from './index.module.scss';
import MediaQuery from 'react-responsive';
import Scroll from 'react-scroll';
import classNames from 'classnames';

const scroll = Scroll.animateScroll;

Array.prototype.recurse = function (callback, delay) {
  delay = delay || 200;
  var self = this,
    idx = 0;

  setInterval(function () {
    callback(self[idx], idx);
    idx = (idx + 1 < self.length) ? idx + 1 : 0;
  }, delay);
};

export default class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state = { productId: 0, value: 10, prodForCalc: null, cycle: true };
  }

  componentDidMount() {
    setInterval(() => {
      if (!this.state.cycle) return;
      let next = this.state.productId + 1;
      if (next > content.products.length - 1) next = 0;
      this.setState({ productId: next });
    }, 2500);
  }

  handleProductClick = (productId) => {
    this.setState({ productId: productId, cycle: false });
  };

  handleStopCycle = () => {
    this.setState({ cycle: false });
  };

  handleCalculate = (productId) => {
    const el = document.getElementById('rechner');
    this.setState({ prodForCalc: productId });
    scroll.scrollTo(el.offsetTop);
  };

  render() {
    const product = content.products[this.state.productId];

    return (
      <DocumentTitle title={config.siteTitle}>
        <div>
          <CookieBanner></CookieBanner>
          <Product data={product} onStopCycle={this.handleStopCycle}
                   onCalculate={this.handleCalculate}/>

          <nav className={styles.productNav}>
            {this.renderNavItems()}
          </nav>

          <nav className={styles.nav}>
            <a href="#was">Was ist fugi-fix?</a>
            <a href="#katalog">Katalog anfordern</a>
            <a href="#werkzeuge">Werkzeuge</a>
            <a href="#kontakt">Kontakt</a>
          </nav>

          <div className={styles.what} id="was">
            <div className={styles.grid}>
              <div className={styles.text}>
                <div className={styles.inner}>
                  <h2>
                    Was ist fugi-fix?
                  </h2>
                  <p>{content.general.what}</p>
                </div>
              </div>
              <div className={styles.image}>
                <img src={prefixLink('/images/shapebild01.png')}/>
              </div>
            </div>

            <div className={styles.grid}>

              <div className={styles.image}>
                <img src={prefixLink('/images/shapebild02.png')}/>
              </div>
              <div className={styles.text}>
                <div className={styles.inner}>
                  <h2>
                    Einsatz von fugi-fix
                  </h2>
                  <p>{content.general.detail}</p>
                </div>
              </div>
            </div>

            <div className={styles.grid}>
              <div className={styles.text}>
                <div className={styles.inner}>
                  <h2>Ihre Vorteile</h2>
                  <ul>
                    {content.general.gain.map(text => <li>{text}</li>)}
                  </ul>
                </div>
              </div>
              <div className={styles.image}>
                <img src={prefixLink('/images/shapebild03.png')}/>
              </div>
            </div>
          </div>

          <h2 className={styles.subtitle}>
            Welches fugi-fix brauche ich?
          </h2>

          <ProductFinder product={this.state.prodForCalc}/>

          <div className={classNames(styles.section, styles['section--alt'])} id="katalog">
            <h2 className={styles.subtitle}>
              Katalog anfordern
            </h2>

            <div className="row">
              <div className="small-8 small-shift-2">
                <CatalogueForm product={this.state.prodForCalc}/>
              </div>
            </div>
          </div>

          <div className={styles.section} id="werkzeuge">
            <h2 className={styles.subtitle}>
              Werkzeuge
            </h2>

            <p className="text-center">
              Wir bieten Ihnen verschiedene Werkzeuge zur sauberen Verlegung des
              Pflasterfugenmörtels.<br/>
              Sollten Sie diese Dinge nicht bereits zu Hause haben, können Sie diese bei einer
              Mörtelbestellung gleich mitbestellen.
            </p>

            <br/>

            <div className={styles['tool-grid']}>
              <div className={styles.tool}>
                <img src={prefixLink('/images/besen01.png')}/>
                <span>Straßenbesen</span>
                <span>Vorreinigung der Fläche</span>
              </div>
              <div className={styles.tool}>
                <img src={prefixLink('/images/besen02.png')}/>
                <span>Feiner Haarbesen</span>
                <span>Endreinigung der Fläche</span>
              </div>
              <div className={styles.tool}>
                <img src={prefixLink('/images/wischer.png')}/>
                <span>Fliesenwischer</span>
                <span>Einarbeitung des Materials</span>
              </div>
              <div className={styles.tool}>
                <img src={prefixLink('/images/Messbecher.png')}/>
                <span>Messbecher</span>
                <span>Für die Wasserzugabe für 2K Mörtel</span>
              </div>
            </div>
          </div>
          <div
            className={classNames(styles.section, styles.section__contact, styles['section--alt'])}
            id="kontakt">
            <h2 className={styles.subtitle}>
              Kontakt
            </h2>
            <div className="row">
              <div className="small-12 text-center">
                <address>
                  <b>Nadler Straßentechnik GmbH</b><br/>
                  Fraunhoferstraße 3<br/>
                  85301 Schweitenkirchen
                </address>
                <dl>
                  <dt><i className="fa fa-phone"></i> Telefon</dt>
                  <dd><a href="tel:00498441924000">08444 - 92400 - 0</a></dd>
                  <dt><i className="fa fa-fax"></i> Fax</dt>
                  <dd>08444 - 92400 - 40</dd>
                  <dt><i className="fa fa-envelope"></i> E-Mail</dt>
                  <dd><a href="mailto:info@strassentechnik.de">info@fugi-fix.de</a></dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </DocumentTitle>
    );
  }

  renderNavItems() {
    return content.products.map((p, i) => {
      return (
        <a key={i} onClick={this.handleProductClick.bind(this, i)}>
          <MediaQuery query='(min-width: 48em)'>
            <span className={`bg--${p.color}`}>{p.title}</span>
            <Hexagon color={p.color} active={i === this.state.productId}/>
          </MediaQuery>
          <MediaQuery query='(max-width: 767px)'>
            <span className={`bg--${p.color}`}>{p.title}</span>
            <Hexagon width={30} strokeWidth={2} color={p.color}
                     active={i === this.state.productId}/>
          </MediaQuery>
        </a>
      );
    });
  }
}
