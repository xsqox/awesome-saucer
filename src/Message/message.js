import React, {Component} from "react";
import styled from 'styled-components';
import img from '../fail-alien.jpg';

const TextSpan = styled.p`
    // width: 280px;
    height: 70px;
    display: inline-block;
    margin: 0 auto;
    padding: 10px 20px;
    transition: all 0.2s ease-in;
    font-size: 20px;
    text-align: center;
    text-transform: uppercase;
    opacity: 1;
    
    &.hidden {
        visibility: hidden;
        opacity: 0;
    }
    
    &.fail {
         color: #ffb3b3;
    //   background: url(${img}) no-repeat bottom center;
    //   background-size: 35%;
    }
    
    &.success {
        color: goldenrod;
    }
`;

export default class Message extends Component {

    render() {
        return (
            <TextSpan className={this.props.className}>{this.props.message}</TextSpan>
        );
    }
};


