import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { BsThreeDotsVertical } from 'react-icons/bs';

const formatDate = (dateString, format) => {
    const options = {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    };

    const date = new Date(dateString);

    if (format === 'DD.MM.AAAA') {
        return date.toLocaleDateString('pt-BR', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        });
    } else if (format === 'HH:mm') {
        return date.toLocaleTimeString('pt-BR', { hour: 'numeric', minute: 'numeric' });
    }

    return '';
};

const UserInfo = ({ id, author, created_at }) => {
    const handleEditPost = () => {
        // Lógica para editar a postagem com o ID id
    };

    const handleDeletePost = () => {
        // Lógica para excluir a postagem com o ID id
    };

    return (
        <div className="d-flex flex-row mb-3">
            <div className="p-2">
                <img
                    src={`http://127.0.0.1:8000/storage/images/avatar_default.png`}
                    alt={`Imagem do usuário ${author}`}
                    style={{
                        width: '50px',
                        height: '50px',
                        marginRight: '10px',
                        borderRadius: '50%',
                    }}
                />
            </div>
            <div>
                <div className="p-2">
                    <h5 className="d:flex justify-start" style={{ width: '400px', height: '20px' }}>{author}</h5>
                    {created_at && (
                        <p className="opacity-50 fw-light">
                            Publicado em {formatDate(created_at, 'DD.MM.AAAA')} às {formatDate(created_at, 'HH:mm')}
                        </p>
                    )}
                </div>
            </div>
            <Dropdown className="ml-auto nav-item dropdown">
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
        </div>
    );
};

export default UserInfo;