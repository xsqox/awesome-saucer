import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Box = styled.div`
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    border: 5px ${props => props.borderType} ${props => props.color};
    color: ${props => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
`;

const BoxContent = styled.span`
    display: inline-block;
`;


class SquareBox extends Component {
  render() {
    const {
      content, size, borderType, color, className,
    } = this.props;
    return (
      <Box className={className} borderType={borderType} size={size} color={color}>
        <BoxContent>
          {content}
        </BoxContent>
      </Box>);
  }
}

SquareBox.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  borderType: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
};

SquareBox.defaultProps = {
  borderType: 'solid',
  size: 30,
  color: '#fff',
  className: '',
};

export default SquareBox;
