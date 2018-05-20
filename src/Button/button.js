import React, {Component} from "react";
import styled from 'styled-components';
import './button.css';

const Btn = styled.button`
    outline: none;
    border: 0;
    padding: 15px 20px;
    border-radius: 10px;
    color: white;
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 2px;
    background-color: blueviolet;
    text-align: center;
    display: inline-block;
    margin: 0 auto;
    width: 220px;   
    
    &.prompting {
        animation: shake 150ms 0.75s 3 linear forwards;
    }
`;

export default class Button extends Component {
    render() {
        return (
            <div ref={(button) => {
                this.button = button
            }} onClick={this.props.onClick}>
                <Btn className={this.props.class}>{this.props.text}</Btn>
            </div>
        )
    }

    prompt() {
        this.button.classList.add('prompting');
        setTimeout(() => {
            this.button.classList.remove('prompting')
        }, 2000);
    }
}

Button.defaultProps = {
    class: 'btn-circle',
    text: 'Press me'
};