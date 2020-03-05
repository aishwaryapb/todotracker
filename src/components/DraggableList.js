import React from "react";

import { ReactComponent as Hamburger } from "../assets/icons/hamburger.svg";
import { DragContainer, DragList, DraggableItem } from '../theme/components';

class DraggableList extends React.Component {

    onDragStart = (e, index) => {
        this.draggedItem = this.state.items[index];
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/html", e.target.parentNode);
        e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
    };

    onDragOver = index => {
        const draggedOverItem = this.state.items[index];

        // if the item is dragged over itself, ignore
        if (this.draggedItem.id === draggedOverItem.id) {
            return;
        }

        // filter out the currently dragged item
        let items = this.state.items.filter(item => item.id !== this.draggedItem.id);

        // add the dragged item after the dragged over item
        items.splice(index, 0, this.draggedItem);

        this.setState({ items });
    };

    onDragEnd = () => this.props.reorder(this.state.items);

    componentDidUpdate() {
        if (!this.state?.items) {
            this.setState({
                items: this.props.items || []
            });
        }
    }

    render() {
        return (
            <DragContainer>
                {this.state?.items?.map((item, idx) => (
                    <DragList key={idx} onDragOver={() => this.onDragOver(idx)}>
                        <DraggableItem
                            draggable
                            onDragStart={e => this.onDragStart(e, idx)}
                            onDragEnd={this.onDragEnd}
                        >
                            <Hamburger className="hamburger" />
                        </DraggableItem>
                        <span className="content">{item.name}</span>
                    </DragList>
                ))}
            </DragContainer>
        );
    }
}

export default DraggableList;