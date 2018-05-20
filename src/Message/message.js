import React, {Component} from "react";
import styled from 'styled-components';
import img from '../fail-alien.jpg';

const TextSpan = styled.p`
    width: 280px;
    height: 220px;
    display: inline-block;
    margin: 0 auto;
    transition: all 0.5s ease-in;
    font-size: 20px;
    text-align: center;
    
    &.hidden {
        visibility: hidden;
    }
    
    &.fail {
        background: url(${img}) no-repeat bottom center;
        background-size: 45%;
    }
    
    &.success {
        color: goldenrod;
        text-transform: uppercase;
        text-align: center;
    }
`;

export default class Message extends Component {

    render() {
        return (
            <TextSpan className={this.props.className}>{this.props.message}</TextSpan>
        );
    }
};


