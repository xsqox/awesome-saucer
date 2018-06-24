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
    box-sizing: border-box;
`;

export default class Beam extends Component {
  constructor() {
    super();
    this.state = {
      maxBeamHeight: 0,
      fillArea: 0,
    };
  }

  componentDidMount() {
    const { maxBeamHeight, maxBeamWidth, fillArea } = this.getInitialBeamSetup();
    this.setState({
      maxBeamHeight, maxBeamWidth, fillArea,
    });
  }

  getInitialBeamSetup() {
    const { steps } = this.props;
    const totalHeight = document.body.scrollHeight;
    const totalWidth = document.body.scrollWidth;
    const beamBox = this.beamRef.getBoundingClientRect();
    const maxBeamHeight = (totalHeight > window.outerHeight) ? totalHeight - beamBox.y - window.scrollY : totalHeight - beamBox.y;
    const maxBeamWidth = (totalWidth > window.outerWidth) ? totalWidth - beamBox.x - window.scrollX : totalWidth - beamBox.x;
    const fillArea = maxBeamHeight / steps;
    return { maxBeamHeight, maxBeamWidth, fillArea };
  }

  render() {
    const { progress, steps } = this.props;
    const { maxBeamHeight, maxBeamWidth, fillArea } = this.state;
    const beamHeight = (progress === steps) ? maxBeamHeight : Math.abs(progress * fillArea);
    let beamWidth = beamHeight / (steps - 1);
    beamWidth = beamWidth > maxBeamWidth ? maxBeamWidth : beamWidth;
    return (
      <BeamRay className="beam" triangleHeight={beamHeight} triangleWidth={beamWidth} innerRef={elt => this.beamRef = elt} />
    );
  }
}

Beam.propTypes = {
  progress: PropTypes.number.isRequired,
  steps: PropTypes.number.isRequired,
};
