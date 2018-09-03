import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Box = styled.div`
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    font-size: 25px;
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
      size, content, borderType, color, className, onClick,
    } = this.props;
    return (
      <Box className={className} borderType={borderType} size={size} color={color} onClick={onClick}>
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
  onClick: PropTypes.func,
};

SquareBox.defaultProps = {
  borderType: 'solid',
  size: 30,
  color: '#fff',
  className: '',
  onClick: null,
};

export default SquareBox;
