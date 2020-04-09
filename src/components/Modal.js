import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ModalContent, ModalBody, ModalHeader, Close } from '../theme/components'

const modal = document.querySelector("#modal");

const toggleVisibility = (isVisible) => {
    isVisible
        ? modal.style.display = "block"
        : modal.style.display = "none";
}

const Modal = ({ heading, body, error, visible, onClose }) => {
    useEffect(() => {
        toggleVisibility(visible);
    });

    const closeModal = () => {
        onClose();
        toggleVisibility(false);
    }

    return (
        <ModalContent>
            <ModalHeader error={error}>
                <Close onClick={closeModal}>&times;</Close>
                <h2>{heading || ''}</h2>
            </ModalHeader>
            <ModalBody>
                <p>{body || ''}</p>
            </ModalBody>
        </ModalContent>
    )
}

export default (props) => ReactDOM.createPortal(<Modal {...props} />, document.querySelector('#modal'));