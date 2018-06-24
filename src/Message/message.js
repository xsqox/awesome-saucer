import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import './message.css';

const Text = styled.p`
    height: 60px;
    vertical-align: bottom;
    margin: 0 auto;
    padding: 5px 5px 0 5px;
    transition: all 0.2s ease-in;
    font-size: 25px;
    text-align: center;
    text-transform: uppercase;
    display:flex;
    flex-direction: column;
    align-content: flex-end;
    justify-content: flex-end;
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
    
    &.victory {
        color: goldenrod;
        font-weight: bold;
        font-size: 30px;
        transition: all 1s ease-out;
        animation: festive_text 2s ease-out infinite;
    }
    
    .message-content {
        margin: auto 0 0 0;
        vertical-align: bottom;
        align-self: flex-end;
    }
`;

export default class Message extends Component {
  render() {
    const { className, message } = this.props;
    return (
      <Text className={`message ${message ? className : 'hidden'}`}>
        <span className="message-content">
          {message}
        </span>
      </Text>
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
