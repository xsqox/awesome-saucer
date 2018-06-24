import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TextSpan = styled.p`
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
    }
    
    &.success {
        color: goldenrod;
    }
`;

export default class Message extends Component {
  render() {
    const { className, message } = this.props;
    return (
      <TextSpan className={message ? className : 'hidden'}>
        {message}
      </TextSpan>
    );
  }
}

Message.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
};

Message.defaultProps = {
  className: '',
  message: '',
};
