import React from 'react';
import Saucer from '../Saucer/saucer';
import Beam from './beam';
import styled from 'styled-components';

const BeamSaucerContainer = styled.div`
     position: relative;
`;


export default class BeamSaucer extends Saucer {

    render() {
        return(
            <BeamSaucerContainer>
                <Saucer scale={this.props.scale} background={this.props.background}/>
                <Beam progress={this.props.progress}/>
            </BeamSaucerContainer>
        )
    }
};