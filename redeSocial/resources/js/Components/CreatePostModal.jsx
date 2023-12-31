import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const CreatePostModal = ({ show, handleClose, handleCreatePost }) => {
    const initialPostState = {
        author: '',
        type: 'Post',
        text: '',
        image: null,
    };

    const [newPost, setNewPost] = useState(initialPostState);

    const [errors, setErrors] = useState({});
    const [showImageError, setShowImageError] = useState(false);

    const handleFieldChange = (e) => {
        const { name, type } = e.target;

        if (type === 'file') {

            const file = e.target.files[0];

            // Verifica se o arquivo é uma imagem e tem extensão jpg ou png
            if (file && file.type.startsWith('image/') && (file.type === 'image/jpeg' || file.type === 'image/png')) {
                setNewPost((prevPost) => ({
                    ...prevPost,
                    [name]: file,
                }));

                // Oculta a mensagem de erro se uma imagem válida for selecionada
                setShowImageError(false);
            } else {
                // Exibe a mensagem de erro se o arquivo não atender aos critérios
                setShowImageError(true);
            }
        } else {
            setNewPost((prevPost) => ({
                ...prevPost,
                [name]: e.target.value,
            }));
        }
    };

    //Valida os forms e adiciona mensagens de error caso esteja com informação errada ou vazio.
    const validateForm = () => {
        const newErrors = {};
        if (!newPost.author.trim()) {
            newErrors.author = 'O autor é obrigatório.';
        }
        if (!newPost.type.trim()) {
            newErrors.type = 'O tipo é obrigatório.';
        }
        if (!newPost.text.trim()) {
            newErrors.text = 'O texto é obrigatório.';
        }
        if (showImageError) {
            newErrors.image = 'Por favor, selecione uma imagem jpg ou png.';
        }
        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    //Usado para formatar o Texto de reactQUILL
    const sanitizeHTML = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || '';
    };

    const handlePostCreate = async () => {
        if (validateForm()) {
            // Remove as tags <p> do HTML gerado pelo React Quill
            const sanitizedText = sanitizeHTML(newPost.text);

            await handleCreatePost({ ...newPost, text: sanitizedText });

            setNewPost(initialPostState); // Limpar os campos após o sucesso
            handleClose();
        }
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
                            isInvalid={!!errors.author}
                        />
                        <Form.Control.Feedback type="invalid">{errors.author}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="type">
                        <Form.Label>Tipo de Postagem</Form.Label>
                        <Form.Control
                            as="select"
                            name="type"
                            value={newPost.type}
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
                            value={newPost.text}
                            onChange={(value) => handleFieldChange({ target: { name: 'text', value } })}
                            className={errors.text ? 'is-invalid' : ''}
                        />
                        <Form.Control.Feedback type="invalid">{errors.text}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="image">
                        <Form.Label>Upload de Imagem</Form.Label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleFieldChange}
                        />
                        {showImageError && (
                            <Form.Text className="text-danger">
                                Por favor, selecione uma imagem jpg ou png.
                            </Form.Text>
                        )}
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