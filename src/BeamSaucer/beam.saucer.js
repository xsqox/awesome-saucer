import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import SaucerShip from '../Saucer/saucer';
import Beam from './beam';

const BeamSaucerContainer = styled.div`
     position: relative;
     z-index: 10;
     margin-bottom: 15px;
`;


export default class BeamSaucer extends Component {
  render() {
    const {
      scale, background, progress, steps,
    } = this.props;
    return (
      <BeamSaucerContainer className="beam-saucer-container">
        <SaucerShip scale={scale} background={background} />
        <Beam progress={progress} steps={steps} />
      </BeamSaucerContainer>
    );
  }
}

BeamSaucer.propTypes = {
  background: PropTypes.string.isRequired,
  scale: PropTypes.number.isRequired,
  progress: PropTypes.number.isRequired,
  steps: PropTypes.number.isRequired,
};
