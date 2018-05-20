import React, {Component} from "react";
import FlipMove from 'react-flip-move';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const List = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
    height: 150px;
`;

const ListItem = styled.li`
    display: inline-block;
    margin: 5px 25px;
`;


export default class DynamicList extends Component {

    generateItem(item, index) {
        return (
            <ListItem key={item.id}>
                {this.props.itemRenderer(item, this.props.onClick)}
            </ListItem>)
    }

    render() {
        return (<List>
            <FlipMove duration={150} easing="ease-out">
                {this.props.items.map((item, index) => {
                    return this.generateItem(item, index)
                })}
            </FlipMove>
        </List>)
    }
}

DynamicList.propTypes = {
    items: PropTypes.array,
    itemRenderer: PropTypes.func.isRequired
};
DynamicList.defaultProps = { items: [] };
