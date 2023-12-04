import React, { useState } from 'react';
import { Card, Dropdown } from 'react-bootstrap';
import { BsThreeDotsVertical } from 'react-icons/bs';

import UserInfo from './UserInfo';
import PostContent from './PostContent';
import EditPostModal from './EditPostModal';

const Post = ({ id, author, type, text, image, created_at }) => {

    //----------------------------- Logica para Editar Post -----------------------------------
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editedPost, setEditedPost] = useState({
        author,
        type,
        text,
        image,
    });
    //Aparecer e sumir o Modal de Editar...
    const handleEditPost = () => {
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };

    //Aqui atualiza o Post, enviado uma requisição de PUT para a API
    const handleUpdatePost = async (updatedPost) => {
        console.log(updatedPost);
        try {
            const updatedPostData = {
                author: updatedPost.author,
                type: updatedPost.type,
                text: updatedPost.text,
            };

            const response = await fetch(`http://127.0.0.1:8000/api/post/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedPostData),
            });

            if (response.ok) {
                closeEditModal();

                alert(`Post de ${author} foi atualizado com sucesso`);

                window.location.reload();
            } else {
                console.error(`Erro ao atualizar post ${id}`);
            }
        } catch (error) {
            console.error('Erro ao processar a solicitação de update:', error);
        }
    };

    //----------------------------- Logica para Excluir Post -----------------------------------
    const handleDeletePost = async () => {
        try {
            //solicitação para excluir a postagem com o ID específico
            const response = await fetch(`http://127.0.0.1:8000/api/post/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {

                alert(`Post de ${author} foi excluído com sucesso`);

                window.location.reload();
            } else {
                console.error(`Erro ao excluir post ${id}`);
            }
        } catch (error) {
            console.error('Erro ao processar a solicitação de exclusão:', error);
        }
    };

    return (
        <Card className="shadow w-75 mx-auto my-4">
            <Card.Body className="">
                <Dropdown className="nav-item dropdown d-md-flex justify-content-md-end">
                    <Dropdown.Toggle className="btn btn-dark dropdown-toggle" variant="secondary" id={`dropdown-${id}`} style={{ border: 'none', boxShadow: 'none' }}>
                        <BsThreeDotsVertical />
                    </Dropdown.Toggle>

                    <style>
                        {`
                        .dropdown-toggle::after {
                            display: none;
                        }
                    `}
                    </style>

                    <Dropdown.Menu className="dropdown-menu dropdown-menu-dark">
                        <Dropdown.Item className="dropdown-item" onClick={handleEditPost}>Editar</Dropdown.Item>
                        <Dropdown.Item className="dropdown-item" onClick={handleDeletePost}>Excluir</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <EditPostModal
                    show={isEditModalOpen}
                    handleClose={closeEditModal}
                    handleUpdatePost={handleUpdatePost}
                    post={editedPost}
                />

                <UserInfo author={author} created_at={created_at} />

                <PostContent type={type} text={text} image={image} />

            </Card.Body>
        </Card>
    );
};

export default Post;