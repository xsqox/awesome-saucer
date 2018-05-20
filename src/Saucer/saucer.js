import React, {Component} from 'react';
import styled from 'styled-components';
import './saucer.css';

const Saucer = styled.div.attrs({
    scale: props => props.scale || 1
})`
    transform: scale(${props => props.scale});
    position: relative;
    margin: 45px auto 0;
    width: 170px;
    height: 80px;
    
    &:hover {
        cursor: pointer;
    }
`;

const SaucerBody = styled.div.attrs({
    background: props => props.background || 'deepskyblue'
})`
    width: 160px;
    height: 50px;
    left: 0;
    right: 0;
    margin: auto;
    border-radius: 80px / 30px;
    background: ${props => props.background};
    position: absolute;
    
    &:after {
        content: '';
        display: inline-block;
        border-top: 2px solid yellow;
        border-bottom: 2px solid yellow;
        width: 50px;
        transform: rotate(55deg);
        z-index: -1;
        bottom: -10px;
        width: 30px;
        position: absolute;
        right: 15px;
    }
        
    &:before {
        content: '';
        display: inline-block;
        border-top: 2px solid yellow;
        border-bottom: 2px solid yellow;
        width: 30px;
        transform: rotate(-55deg);
        position: absolute;
        top: 55px;
        z-index: -1;
        left: 15px;
    }
`;

const SaucerWindows = styled.div`
        position: absolute;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        top: 15px;
        width: 170px;
        height: 15px;
        border-radius: 60%;
        background: yellow;
        left: 0;
        right: 0;
        margin: auto;
        z-index: 10;
        
        > * {
            :nth-child(odd) {
                animation: odd_flash 0.5s infinite alternate;
            }
            
            :nth-child(even) {
                animation: even_flash 0.5s infinite alternate;
            }
        }   
`;

const SaucerHead = styled.div`
        width: 70px;
        height: 20px;
        border-top-left-radius: 80%;
        border-top-right-radius: 80%;
        background: yellow;
        position: absolute;
        top: -10px;
        left: 0;
        right: 0;
        margin: auto;
        z-index: 0;
        
        &:before {
            content: '';
            display: inline-block;
            border-top: 2px solid yellow;
            border-bottom: 1px solid yellow;
            width: 20px;
            transform: rotate(25deg);
            position: absolute;
            top: -5px;
            z-index: -1;
            left: 12px;
        }
        
        &:after {
            content: '';
            display: inline-block;
            border-top: 2px solid yellow;
            border-bottom: 1px solid yellow;
            width: 20px;
            transform: rotate(-25deg);
            z-index: -1;
            top: -3px;
            width: 30px;
            position: absolute;
            right: 12px;
        }
`;

const SaucerWindow = styled.span`
      width: 10px;
      height: 10px;
      border-radius: 50%;
      align-content: center;
      background: mediumvioletred;
`;

export default class SaucerShip extends Component {
    render() {
        return <div onClick={() => this.props.saucer ? this.props.onClick(this.props.saucer.id) : null}>
            <Saucer scale={this.props.scale}>
                <SaucerHead/>
                <SaucerBody background={this.props.background}/>
                <SaucerWindows>
                    <SaucerWindow/>
                    <SaucerWindow/>
                    <SaucerWindow/>
                    <SaucerWindow/>
                    <SaucerWindow/>
                </SaucerWindows>
            </Saucer>
        </div>
    }
}
