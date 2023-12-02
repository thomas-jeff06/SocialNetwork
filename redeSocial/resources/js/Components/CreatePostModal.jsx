import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const CreatePostModal = ({ show, handleClose, handleCreatePost }) => {
    const [newPost, setNewPost] = useState({
        author: "",
        type: "Post",
        text: "",
        image: null,
    });

    const handleFieldChange = (e) => {

        const { name, type } = e.target;

        if (type === 'file') {
            setNewPost((prevPost) => ({
                ...prevPost,
                [name]: e.target.files[0],
            }));
        } else {
            setNewPost((prevPost) => ({
                ...prevPost,
                [name]: e.target.value,
            }));
        }
    };

    const handlePostCreate = () => {
        handleCreatePost(newPost);
        handleClose();
    };

    return (
        <Modal className="modal" tabindex="-1" show={show} onHide={handleClose}>

            <Modal.Header className="modal-header" closeButton>
                <Modal.Title className="modal-title">Criar Nova Postagem</Modal.Title>
            </Modal.Header>

            <Modal.Body className="modal-body">
                <Form>
                    <Form.Group controlId="author">
                        <Form.Label>Nome do Usuário</Form.Label>
                        <Form.Control
                            type="text"
                            name="author"
                            value={newPost.author}
                            onChange={handleFieldChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="type">
                        <Form.Label>Tipo de Postagem</Form.Label>
                        <Form.Control
                            as="select"
                            name="type"
                            value={newPost.type}
                            onChange={handleFieldChange}
                        >
                            <option value="Post">Post</option>
                            <option value="Article">Artigo</option>
                            <option value="Group">Grupo</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="text">
                        <Form.Label>Conteúdo da Postagem</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="text"
                            value={newPost.text}
                            onChange={handleFieldChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="image">
                        <Form.Label>Upload de Imagem</Form.Label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleFieldChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Fechar
                </Button>
                <Button variant="primary" onClick={handlePostCreate}>
                    Publicar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreatePostModal;