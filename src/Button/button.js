import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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
    const { onClick, className, text } = this.props;
    return (
      <Btn className={className} onClick={onClick}>
        {text}
      </Btn>
    );
  }
}

Button.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  className: 'btn-circle',
  text: 'Click me',
};
