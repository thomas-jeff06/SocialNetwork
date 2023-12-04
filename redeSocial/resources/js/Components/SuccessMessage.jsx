import React from 'react';
import { Alert } from 'react-bootstrap';

const SuccessMessage = ({ message, onClose }) => {
    return (
        <Alert variant="success" onClose={onClose} dismissible>
            <p>{message}</p>
        </Alert>
    );
};

export default SuccessMessage;