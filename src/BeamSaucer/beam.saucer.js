import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import SaucerShip from '../Saucer/saucer';
import Beam from './beam';

const BeamSaucerContainer = styled.div`
     position: relative;
     z-index: 10;
`;


export default class BeamSaucer extends Component {
  render() {
    const { scale, background, progress } = this.props;
    return (
      <BeamSaucerContainer className="beam-saucer-container">
        <SaucerShip scale={scale} background={background} />
        <Beam progress={progress} />
      </BeamSaucerContainer>
    );
  }
}

BeamSaucer.propTypes = {
  background: PropTypes.string.isRequired,
  scale: PropTypes.number.isRequired,
  progress: PropTypes.number.isRequired,
};
