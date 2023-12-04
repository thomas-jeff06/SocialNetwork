import React from 'react';
import { Alert } from 'react-bootstrap';

const ErrorMessage = ({ message, onClose }) => {
    return (
        <Alert variant="danger" onClose={onClose} dismissible>
            <Alert.Heading>Erro!</Alert.Heading>
            <p>{message}</p>
        </Alert>
    );
};

export default ErrorMessage;