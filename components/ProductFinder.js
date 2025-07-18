import React from 'react';
import { prefixLink } from 'gatsby-helpers';
import content from '../content.yaml';
import RangeSlider from './RangeSlider';
import styles from './ProductFinder.module.scss';
import classNames from 'classnames';
import numeral from 'numeral';

const language = {
  delimiters: {
    thousands: '.',
    decimal: ',',
  },
  abbreviations: {
    thousand: 'k',
    million: 'm',
    billion: 'b',
    trillion: 't',
  },
  currency: {
    symbol: '€',
  },
};

numeral.language('de', language);

numeral.language('de');

export default class ProductFinder extends React.Component {
  static propTypes = {
    product: React.PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.state = {
      weight: 1,
      width: 1,
      depth: 30,
      product: null,
      plaster: {
        width: 0,
        height: 0,
      },
    };

    this.category = {
      // Human
      1: {
        weight: 0.3,
        min: 1,
        max: 50,
        products: [0],
      },
      // Car
      2: {
        weight: 7.5,
        min: 3,
        max: 50,
        products: [2, 3],
      },
      // Truck
      3: {
        weight: 25,
        min: 5,
        max: 50,
        products: [4, 5],
      },
      // Large truck
      4: {
        weight: 40,
        min: 10,
        max: 50,
        products: [6],
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    const productWeights = {
      // ProductId -> Weight
      1: 1, // schlämmbar
      2: 1, // belastbar
      3: 2, // farbig
      5: 3, // schnellfest
      6: 4, // hoch belastbar
    };
    const productId = nextProps.product;

    if (productId != null) {
      this.state.product = productId;
      this.state.weight = productWeights[productId];

      switch (productId) {
        case 0:
          this.category[1].products = [0];
          this.state.width = 1;
          break;

        case 1:
        case 2:
          this.category[1].products = [0, 1, 2];
          this.state.width = this.category[this.state.weight].min > 3 ? this.category[this.state.weight].min : 3;
          this.state.depth = 30;
          break;

        default:
          this.category[1].products = [0, 1, 2];
          this.state.width = this.category[this.state.weight].min > 3 ? this.category[this.state.weight].min : 3;
          this.state.depth = content.products[productId].depth.min;
          break;
      }
    }
  }

  handleWeightChange = (weight) => {
    this.setState({
      weight: weight,
      product: null,
      width: (this.state.width < this.category[weight].min ? this.category[weight].min : this.state.width),
    });
  };

  handleWidthChange = (width) => {
    if (this.state.weight === 1 && width < 4) {
      this.category[1].products = [0];
      if (width === 3) this.category[1].products.push(1, 2);
    } else {
      this.category[1].products = [1, 2];
    }

    this.setState({
      width: width,
    });
  };

  handleDepthChange = (depth) => {
    this.setState({
      depth: depth,
    });
  };

  handleProductSelect = (product) => {
    let depth;

    switch (product) {
      case 1:
        depth = 30;
        break;

      case 2:
        depth = 30;
        break;

      // hoch belastbar
      case 6:
        depth = this.product(product).depth.min;
        break;

      default:
        depth = 30;
        break;
    }

    this.setState({
      product: product,
      depth: (this.state.depth < depth ? depth : this.state.depth),
    });
  };

  handlePlasterWidthChange = (ev) => {
    this.setState({
      plaster: {
        width: parseInt(ev.currentTarget.value),
        height: this.state.plaster.height,
      },
    });
  };

  handlePlasterHeightChange = (ev) => {
    this.setState({
      plaster: {
        width: this.state.plaster.width,
        height: parseInt(ev.currentTarget.value),
      },
    });
  };

  product(id) {
    return content.products[id];
  }

  getResult() {
    if (this.state.product === null) return 0;

    const density = this.product(this.state.product).density;
    const { plaster, width, depth } = this.state;
    let result = 0;

    const step1 = (100 / (plaster.width + (width / 10))) + (100 / (plaster.height + (width / 10)));
    if (!step1) return 0;

    const volume = 100 * (width / 10) * (depth / 10);
    const mass = volume * density;

    result = ((mass * step1) / 1000);
    if (!result) return 0;

    return result;
  }

  render() {
    return (
      <div className={styles.finder}>
        <div id="rechner" className={styles.finder__select}>
          <p className="text-center">Finden Sie ein fugi-fix Produkt das zu Ihrem Projekt passt. Sie
            können entweder die Belastung und die Fugenbreite auswählen, oder oben auf dieser Seite
            bei Ihrem fugi-fix Produkt direkt den Verbrauch berechnen.</p>
          <h2>Belastung</h2>
          <div className={styles.scale}>
            <div className={styles.weight}><img src={prefixLink('/images/signet_human.svg')}/></div>
            <div className={styles.weight}><img src={prefixLink('/images/signet_car.svg')}/></div>
            <div className={styles.weight}><img src={prefixLink('/images/signet_truck_l.svg')}/>
            </div>
            <div className={styles.weight}><img src={prefixLink('/images/signet_truck_xl.svg')}/>
            </div>
          </div>

          <RangeSlider
            min={1}
            max={4}
            step={1}
            value={this.state.weight}
            valueDisplay={<span>{this.category[this.state.weight].weight} <span
              className={styles.small}>t</span></span>}
            valueSuffix="t"
            orientation="horizontal"
            onChange={this.handleWeightChange}/>

          <h2>Fugenbreite</h2>
          <RangeSlider
            min={this.category[this.state.weight].min}
            max={this.category[this.state.weight].max}
            step={1}
            value={this.state.width}
            valueDisplay={<span>{this.state.width} <span className={styles.small}>mm</span></span>}
            orientation="horizontal"
            onChange={this.handleWidthChange}/>
        </div>

        <div className={styles.finder__products}>
          <h2>Bitte wählen Sie ein Produkt, um den Verbrauch zu berechnen</h2>
          {this.renderProducts()}
        </div>

        {this.renderSecondPart()}
        {this.renderResult()}
      </div>
    );
  }

  renderProducts() {
    const products = this.category[this.state.weight].products.map(i => {
      const classes = classNames(styles.finder__products__column, {
        [`${styles['finder__products__column--active']}`]: this.state.product === i,
      });
      return (
        <div key={i} className={classes} onClick={this.handleProductSelect.bind(this, i)}>
          <img src={prefixLink(content.products[i].image)}/>
          <div>{content.products[i].title}</div>
        </div>
      );
    });

    return (
      <div>{products}</div>
    );
  }

  renderResult() {
    if (this.getResult() === 0) return;

    const product = content.products[this.state.product];
    const result = numeral(this.getResult())
    .format('0,0.0');
    const mailto = `mailto:info@fugi-fix.de?subject=Angebot für ${product.title}&body=Bitte schicken Sie mir ein Angebot über ${result} kg/m² für das Produkt ${product.title}. Vielen Dank!`;

    return (
      <div>
        <div className={styles.finder__result}>
          <div className={styles.result}>{result} kg/m&sup2;</div>
          <p>Bedarfsmenge für 1 m&sup2; {product.title}</p>
          <small>Bei den angegebenen Werten handelt es sich um Erfahrungswerte, diese sind jedoch
            unverbindlich und begründen kein vertragliches Rechtsverhältnis.</small>
        </div>

        <div className={styles.finder__actions}>
          <div className="row">
            <div className="medium-6">
              <a className="btn btn--block" href={mailto} target="_blank">Jetzt Angebot
                anfordern</a>
            </div>
            <div className="medium-6">
              <a className="btn btn--block" href={prefixLink(product.pdf)} target="_blank">Mehr
                Infos zum Produkt</a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderSecondPart() {
    if (this.state.product === null) return;

    const { depth } = this.product(this.state.product);

    return (
      <div className={styles.finder__select}>
        <h2>Fugentiefe</h2>
        <RangeSlider
          min={depth.min}
          max={depth.max}
          step={1}
          value={this.state.depth}
          valueDisplay={<span>{this.state.depth} <span className={styles.small}>mm</span></span>}
          orientation="horizontal"
          onChange={this.handleDepthChange}/>

        {(this.state.depth < 30) ?
          <div className={styles.warning}>
            Achtung: Eine Fugentiefe unter 30 mm ist nur bei keramischen Platten in Verbindung mit
            speziellem Untergrundaufbau möglich.
          </div>
          : null
        }


        <h2>Pflasterstein Größe (Länge x Breite in cm)</h2>
        <div className={styles.form}>
          <input type="number" value={this.state.plaster.width}
                 onChange={this.handlePlasterWidthChange}/>
          <input type="number" value={this.state.plaster.height}
                 onChange={this.handlePlasterHeightChange}/>
        </div>
      </div>
    );
  }
}
