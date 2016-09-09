import React from 'react'

const Hexagon = (props) => {
  const { width, strokeWidth } = props
  const height = width * 0.8

  const hex = {
    width: width,
    height: height,
    margin: width / 4, // + (strokeWidth / 2),
    indent: strokeWidth
  }

  let styles = {
    strokeWidth: strokeWidth,
  }

  hex.points = [
    [hex.margin + hex.indent, 0 + hex.indent],
    [0 + hex.indent * 1.5, hex.height / 2],
    [hex.margin + hex.indent, hex.height - hex.indent],
    [hex.width - hex.margin - hex.indent, hex.height - hex.indent],
    [hex.width - hex.indent * 1.5, hex.height / 2],
    [hex.width - hex.margin - hex.indent, 0 + hex.indent]
  ]

  const hexPoints = hex.points.map(point => point.join(',')).join(' ')

  return (
    <svg width={width} height={height}>
      <polygon className="hex" style={styles} points={hexPoints}></polygon>
    </svg>
  )
}

Hexagon.propTypes = {
  width: React.PropTypes.number,
  strokeWidth: React.PropTypes.number
}
Hexagon.defaultProps = {
  width: 50,
  strokeWidth: 3
}

export default Hexagon
