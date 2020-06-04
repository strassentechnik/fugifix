import React from 'react';
import styles from './CookieBanner.module.scss';

export default class CookieBanner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        visible: false,
      });
    }, 10000);
  }

  render() {
    if (this.state.visible) {
      return (
        <div className={styles.banner}>
          <span>Diese Website verwendet keine Cookies</span>
        </div>
      );
    }
    return null;
  }
}
