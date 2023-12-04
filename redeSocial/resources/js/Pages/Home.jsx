import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { Button, Dropdown } from 'react-bootstrap';
import Post from '../components/Post';
import CreatePostModal from '../components/CreatePostModal';
import SuccessMessage from '../components/SuccessMessage';
import ErrorMessage from '../components/ErrorMessage';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [showModal, setShowModal] = useState(false);

    //Variaveis para Mensagens de erro e sucesso...
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    //Funcão que Carrega Posts
    const loadPosts = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/posts');

            if (response.ok) {
                const fetchedPosts = await response.json();
                const sortedPosts = fetchedPosts.sort((a, b) => b.id - a.id);
                setPosts(sortedPosts);
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Erro ao carregar postagens');
                setShowError(true);
            }
        } catch (error) {
            console.error('Erro ao processar a solicitação:', error);
        }
    };

    useEffect(() => {
        loadPosts();
    }, []);

    //Funcão que chama a API de POST para criar um novo Post
    const handleCreatePost = async (newPost) => {
        try {
            const formData = new FormData();
            formData.append('author', newPost.author);
            formData.append('type', newPost.type);
            formData.append('text', newPost.text);

            if (newPost.image) {
                formData.append('image', newPost.image);
            }

            const response = await fetch('http://127.0.0.1:8000/api/post', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                loadPosts();
                setSuccessMessage('Postagem criada com sucesso!');
                setShowSuccess(true);
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Erro ao criar postagem');
                setShowError(true);
            }
        } catch (error) {
            console.error('Erro ao processar a solicitação:', error);
            setErrorMessage('Erro ao processar a solicitação');
            setShowError(true);
        }

        handleCloseModal(); 0
    };

    //Sessão para fechar e abrir Modal e messagens
    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleCloseSuccessMessage = () => {
        setShowSuccess(false);
        setSuccessMessage('');
    };

    const handleCloseErrorMessage = () => {
        setShowError(false);
        setErrorMessage('');
    };

    return (
        <>
            <Head title="Home" />
            <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                <div className="">

                    {showSuccess &&
                        <SuccessMessage
                            message={successMessage}
                            onClose={handleCloseSuccessMessage} />}

                    {showError &&
                        <ErrorMessage
                            message={errorMessage}
                            onClose={handleCloseErrorMessage} />}


                    <div className="container">
                        <div className="bg-secondary text-center p-3 d-flex align-items-center" style={{ borderRadius: '20%', width: '145px', height: '70px', marginTop: '10px', marginRight: '10px', marginBottom: '10px' }}>
                            <h1>LOGO</h1>
                        </div>
                    </div>

                    <div className="bg-secondary p-0.5 opacity-50"></div>

                    <div>
                        <Button className="btn btn-primary p-2 d-grid gap-2 col-2 mx-auto" variant="primary" onClick={handleOpenModal} style={{ marginTop: '20px', marginBottom: '20px' }}>
                            Criar Post
                        </Button>
                        <CreatePostModal
                            show={showModal}
                            handleClose={handleCloseModal}
                            handleCreatePost={handleCreatePost}
                        />

                        <div className="bg-secondary p-0.5 opacity-50"></div>
                        <div>
                            {posts.map((post) => (
                                <div key={post.id} className="mb-4">
                                    <Post {...post} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                .bg-dots-darker {
                    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
                }
                @media (prefers-color-scheme: dark) {
                    .dark\\:bg-dots-lighter {
                        background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
                    }
                }
            `}</style>
        </>
    );
};

export default Home;