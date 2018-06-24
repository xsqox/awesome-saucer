import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const BeamRay = styled.div`
    width: 0;
    height: 0;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    top: 80%;
    z-index: 1;
    margin: auto;
    border-style: solid;
    border-width: 0px ${props => props.triangleWidth}px ${(props => props.triangleHeight)}px ${props => props.triangleWidth}px;
    border-color: transparent transparent rgba(255,255,0, 0.5) transparent;
    transition: all 0.5s;
`;

export default class Beam extends Component {
  constructor() {
    super();
    this.maxHeight = 0;
    this.step = 0;
  }

  componentDidMount() {
    this.maxHeight = window.outerHeight - this.beamRay.getBoundingClientRect().y;
    this.step = this.maxHeight / 3;
  }

  render() {
    const { progress } = this.props;
    const triangleHeight = Math.abs(progress * this.step);
    const triangleWidth = triangleHeight / 3;
    return (
      <BeamRay className="beam" triangleHeight={triangleHeight} triangleWidth={triangleWidth} innerRef={comp => this.beamRay = comp} />
    );
  }
}

Beam.propTypes = {
  progress: PropTypes.number.isRequired,
};
