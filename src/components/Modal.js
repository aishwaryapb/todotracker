import React from 'react';
import ReactDOM from 'react-dom';
import { ModalContent, ModalBody, ModalHeader, Close, ModalContainer } from '../theme/components'

export const Modal = ({ heading, body, error, visible, onClose }) => {

    return visible && (
        <ModalContainer>
            <ModalContent>
                <ModalHeader error={error}>
                    <Close onClick={() => onClose()}>&times;</Close>
                    <h2>{heading || ''}</h2>
                </ModalHeader>
                <ModalBody>
                    <p>{body || ''}</p>
                </ModalBody>
            </ModalContent>
        </ModalContainer>
    )
}

export default (props) => ReactDOM.createPortal(<Modal {...props} />, document.querySelector('#modal'));