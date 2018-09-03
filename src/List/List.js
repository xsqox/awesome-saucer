import React, { Component } from 'react';
import FlipMove from 'react-flip-move';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const List = styled.div`

    & > ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        height: 150px;
        z-index: 100;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        
        @media screen and (orientation: portrait) {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
        }
    }
`;

const ListItem = styled.li`
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
        <FlipMove duration={150} easing="ease-out" typeName="ul">
          {items.map((item, index) => this.generateItem(item, index))}
        </FlipMove>
      </List>
    );
  }
}

DynamicList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape),
  itemRenderer: PropTypes.func.isRequired,
  onClick: PropTypes.func,
};

DynamicList.defaultProps = { items: [], onClick: null };
