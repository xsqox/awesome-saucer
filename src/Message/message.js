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
        height: 0;
        width: 0;
    }
    
    &.fail {
        background: url(${img}) no-repeat bottom center;
        background-size: 45%;
    }
    
    &.success {
        color: goldenrod;
        text-transform: uppercase;
        height: 220px;
        display: flex;
        align-items: center;
        flex-direction: row;
    }
`;

export default class Message extends Component {

    render() {
        return (
            <TextSpan className={this.props.className}>{this.props.message}</TextSpan>
        );
    }
};
//
// .textspan {
//     text-align: center;
//     width: 280px;
//     height: 220px;
//     display: inline-block;
//     margin: 0 auto;
//     transition: all 0.5s ease-in;
//     justify-content: center;
// }
//
// .textarea.hidden {
//     height: 0;
//     width: 0;
// }
//
// .textspan p {
//     font-size: 20px;
//     margin: 0;
//     text-align: center;
// }

// .fail {
//     background: url('fail-alien.jpg') no-repeat bottom center;
//     background-size: 45%;
// }
//
// .success {
//     color: goldenrod;
//     text-transform: uppercase;
//     height: 220px;
//     display: flex;
//     align-items: center;
//     flex-direction: row;
// }
//
// .success p {
//     display: inline;
//     vertical-align: bottom;
//     align-self: flex-end;
// }

