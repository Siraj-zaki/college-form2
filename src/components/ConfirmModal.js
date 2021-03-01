import React, { useState } from 'react'
// import { Modal, Button } from "bootstrap";
import { Modal, ModalBody, ModalFooter, ModalDialog, Button } from "react-bootstrap";

export default ({ title, body, doText, cancelText, show, onCancelClick, onDoClick }) => {

     

    return (

        <Modal show={true} backdrop={onCancelClick} onHide={onCancelClick} keyboard={true}           >

            {/* <ModalDialog>Modal title</ModalDialog> */}

            <ModalBody  >{body ? body : 'Are you sure to delete?'}</ModalBody>

            <ModalFooter>
                <Button variant='info' onClick={onCancelClick}>{cancelText ? cancelText : 'Cancel'}</Button>
                <Button variant="danger" onClick={onDoClick}>{doText ? doText : 'Delete'}</Button>
            </ModalFooter>
        </Modal>

    );
}