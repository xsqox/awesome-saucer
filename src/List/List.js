import React, { Component } from 'react';
import FlipMove from 'react-flip-move';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const List = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
    height: 150px;
    z-index: 100;
    display: flex;
    justify-content: space-around;
`;

const ListItem = styled.li`
    display: inline-block;
    margin: 5px 15px;
`;


export default class DynamicList extends Component {
  generateItem(item) {
    const { itemRenderer, onClick } = this.props;
    return (
      <ListItem key={item.id}>
        {itemRenderer(item, onClick)}
      </ListItem>);
  }

  render() {
    const { items } = this.props;
    return (
      <List>
        <FlipMove duration={150} easing="ease-out">
          {items.map((item, index) => this.generateItem(item, index))}
        </FlipMove>
      </List>
    );
  }
}

DynamicList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape),
  itemRenderer: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};
DynamicList.defaultProps = { items: [] };
