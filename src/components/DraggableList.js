import React from "react";

import { ReactComponent as Hamburger } from "../assets/icons/hamburger.svg";
import { ReactComponent as Delete } from "../assets/icons/trash.svg";
import { DragContainer, DragList, DraggableItem, Right } from '../theme/components';

const fitContent = {
    minWidth: "fit-content"
};

class DraggableList extends React.Component {

    onDragStart = (e, index) => {
        this.draggedItem = this.props.items[index];
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/html", e.target.parentNode);
        e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
    };

    onDragOver = index => {
        const draggedOverItem = this.props.items[index];

        // if the item is dragged over itself, ignore
        if (this.draggedItem.id === draggedOverItem.id) {
            return;
        }

        // filter out the currently dragged item
        let items = this.props.items.filter(item => item.id !== this.draggedItem.id);

        // add the dragged item after the dragged over item
        items.splice(index, 0, this.draggedItem);

        this.props.update(items);
    };

    onDragEnd = () => this.props.reorder(this.props.items);

    render() {
        return (
            <DragContainer>
                {this.props?.items?.map((item, idx) => (
                    <DragList key={idx} onDragOver={() => this.onDragOver(idx)}>
                        <DraggableItem
                            draggable
                            onDragStart={e => this.onDragStart(e, idx)}
                            onDragEnd={this.onDragEnd}
                        >
                            <Hamburger className="hamburger" />
                        </DraggableItem>
                        <div style={fitContent}>{item.name}</div>
                        <Right><Delete className="delete" onClick={() => this.props.delete(item.id)} /></Right>
                    </DragList>
                ))}
            </DragContainer>
        );
    }
}

export default DraggableList;