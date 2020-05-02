import React from "react";

import { ReactComponent as Hamburger } from "../assets/icons/hamburger.svg";
import { ReactComponent as Delete } from "../assets/icons/trash.svg";
import { ReactComponent as Tick } from "../assets/icons/tick.svg";
import { DragContainer, DragList, DraggableItem, Right, ItemContent } from '../theme/components';

export class DraggableList extends React.Component {

    isDeleting = false;
    itemToggled = undefined;

    handleDelete = (itemId) => {
        this.isDeleting = true;
        this.props.delete(itemId)
    }

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
        const { toggleItem, items, type, width, loading, select } = this.props;
        const isSelectable = select !== undefined;
        return (
            items?.length > 0 &&
            <DragContainer type={type}>
                {
                    items?.map((item, idx) => {
                        const extraProps = toggleItem !== undefined
                            ? {
                                onClick: () => {
                                    if (this.isDeleting) this.isDeleting = false
                                    else {
                                        toggleItem(item)
                                        this.itemToggled = idx;
                                    }
                                },
                                toggled: item.completed
                            }
                            : isSelectable
                                ? {
                                    onClick: () => {
                                        if (this.isDeleting) this.isDeleting = false
                                        else select(item)
                                    }
                                }
                                : {};
                        return (
                            <DragList
                                key={idx}
                                onDragOver={() => this.onDragOver(idx)}
                                width={width}
                                isLoading={this.itemToggled === idx && loading}
                                {...extraProps}
                                isSelectable={isSelectable}
                            >
                                <DraggableItem
                                    draggable
                                    onDragStart={e => this.onDragStart(e, idx)}
                                    onDragEnd={this.onDragEnd}
                                >
                                    {item.completed === true ? <Tick className="move" /> : <Hamburger className="hamburger move" />}
                                </DraggableItem>
                                <ItemContent className="pointer">{item.name}</ItemContent>
                                {(item.completed !== true || !item.categoryId) && <Right width={42}><Delete className="delete pointer" onClick={() => this.handleDelete(item)} /></Right>}
                            </DragList>
                        )
                    })
                }
            </DragContainer>
        );
    }
}

export default DraggableList;