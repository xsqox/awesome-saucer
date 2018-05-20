import React, {Component} from 'react';
import styled from 'styled-components';

const BeamRay = styled.div`
    width: 0;
    height: 0;
    position: absolute;
    left: 0;
    right: 0;
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

    render() {
        const triangleHeight = Math.abs(this.props.progress * this.step);
        const triangleWidth = triangleHeight / 5;
        return (
            <BeamRay triangleHeight={triangleHeight} triangleWidth={triangleWidth} className="blah" innerRef={comp => this.beamRay = comp}/>
        );
    }

    componentDidMount() {
        this.maxHeight = window.outerHeight - this.beamRay.getBoundingClientRect().y;
        this.step = this.maxHeight / 5;
    }
};

