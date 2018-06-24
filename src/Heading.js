import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';


const Header = styled.h1`
    padding: 5px;
`;


export default class Heading extends Component {
  render() {
    const { className, heading } = this.props;
    return (
      <Header className={className}>
        {heading}
      </Header>
    );
  }
}

Heading.propTypes = {
  heading: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Heading.defaultProps = {
  className: '',
};
