import React from 'react';
import styles from './Hexagon.module.scss';
import classNames from 'classnames';

const Hexagon = (props) => {
  const { width, strokeWidth } = props;
  const height = width * 0.83;
  const className = classNames(styles.hex, styles[`hex--${props.color}`], {
    [styles[`hex--active`]]: props.active,
  });

  const hex = {
    width: width,
    height: height,
    margin: width / 4, // + (strokeWidth / 2),
    indent: strokeWidth,
  };

  let style = {
    strokeWidth: strokeWidth,
  };

  hex.points = [
    [hex.margin + hex.indent, 0 + hex.indent],
    [hex.indent * 1.5, hex.height / 2],
    [hex.margin + hex.indent, hex.height - hex.indent],
    [hex.width - hex.margin - hex.indent, hex.height - hex.indent],
    [hex.width - hex.indent * 1.5, hex.height / 2],
    [hex.width - hex.margin - hex.indent, 0 + hex.indent],
  ];

  const hexPoints = hex.points.map(point => point.join(','))
  .join(' ');

  return (
    <svg width={width} height={height}>
      <polygon className={className} style={style} points={hexPoints}></polygon>
    </svg>
  );
};

Hexagon.propTypes = {
  width: React.PropTypes.number,
  strokeWidth: React.PropTypes.number,
  color: React.PropTypes.string,
  active: React.PropTypes.bool,
};
Hexagon.defaultProps = {
  width: 50,
  strokeWidth: 3,
  color: 'red',
  active: false,
};

export default Hexagon;
