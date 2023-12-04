import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditPostModal = ({ show, handleClose, handleUpdatePost, post }) => {
    // Adicione um estado local para rastrear as informações editadas
    const [editedPost, setEditedPost] = useState({ ...post });

    const [errors, setErrors] = useState({});
    const [showImageError, setShowImageError] = useState(false);

    //Bem parecido com CreatePostModal.
    const handleFieldChange = (e) => {
        const { name, type } = e.target;

        if (type === 'file') {

            const file = e.target.files[0];

            if (file && file.type.startsWith('image/') && (file.type === 'image/jpeg' || file.type === 'image/png')) {
                setEditedPost((prevPost) => ({
                    ...prevPost,
                    [name]: file,
                }));

                setShowImageError(false);
            } else {
                setShowImageError(true);
            }
        } else {
            setEditedPost((prevPost) => ({
                ...prevPost,
                [name]: e.target.value,
            }));
        }
    };

    //Mesmo valdiate de CreatePostModal.
    const validateForm = () => {
        const newErrors = {};
        if (!editedPost.author.trim()) {
            newErrors.author = 'O autor é obrigatório.';
        }
        if (!editedPost.type.trim()) {
            newErrors.type = 'O tipo é obrigatório.';
        }
        if (!editedPost.text.trim()) {
            newErrors.text = 'O texto é obrigatório.';
        }
        if (showImageError) {
            newErrors.image = 'Por favor, selecione uma imagem jpg ou png.';
        }
        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };


    const sanitizeHTML = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || '';
    };

    const handleSaveChanges = async () => {
        if (validateForm()) {
            editedPost.text = sanitizeHTML(editedPost.text);
            console.log(editedPost);
            await handleUpdatePost(editedPost);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="Author">
                        <Form.Label>Autor</Form.Label>
                        <Form.Control
                            type="text"
                            name="author"
                            value={editedPost.author}
                            onChange={handleFieldChange}
                            isInvalid={!!errors.author}
                        />
                        <Form.Control.Feedback type="invalid">{errors.author}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="type">
                        <Form.Label>Tipo de Postagem</Form.Label>
                        <Form.Control
                            as="select"
                            name="type"
                            value={editedPost.type}
                            onChange={handleFieldChange}
                            isInvalid={!!errors.type}
                        >
                            <option value="Post">Post</option>
                            <option value="Article">Artigo</option>
                            <option value="Group">Grupo</option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">{errors.type}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="text">
                        <Form.Label>Conteúdo da Postagem</Form.Label>
                        <ReactQuill
                            value={editedPost.text}
                            onChange={(value) => handleFieldChange({ target: { name: 'text', value } })}
                            className={errors.text ? 'is-invalid' : ''}
                        />
                        <Form.Control.Feedback type="invalid">{errors.text}</Form.Control.Feedback>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Fechar
                </Button>
                <Button variant="primary" onClick={handleSaveChanges}>
                    Salvar Alterações
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditPostModal;