import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { Button, Dropdown } from 'react-bootstrap';
import Post from '../components/Post';
import CreatePostModal from '../components/CreatePostModal';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newPost, setNewPost] = useState({
        author: '',
        type: 'Post',
        text: '',
        image: null,
    });

    const [successMessage, setSuccessMessage] = useState('');

    const [showSuccessMessage, setShowSuccessMessage] = React.useState(false);

    const handleCreatePost = async (newPost) => {
        try {
            console.log(newPost);

            const formData = new FormData();
            formData.append('author', newPost.author);
            formData.append('type', newPost.type);
            formData.append('text', newPost.text);

            if (newPost.image) {
                formData.append('image', newPost.image);
            }

            const response = await fetch('http://127.0.0.1:8000/api/posts', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                loadPosts();
                setNewPost({
                    author: '',
                    type: 'Post',
                    text: '',
                    image: null,
                });
                setSuccessMessage('Post criado com sucesso!');
            } else {
                console.error('Erro ao criar postagem', newPost);
            }
        } catch (error) {
            console.error('Erro ao processar a solicitação:', error);
        }

        handleCloseModal(); 0
    };

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const showSuccess = () => {
        setShowSuccessMessage(true);
    };

    const loadPosts = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/posts');

            if (response.ok) {
                const fetchedPosts = await response.json();
                setPosts(fetchedPosts);
            } else {
                console.error('Erro ao obter postagens');
            }
        } catch (error) {
            console.error('Erro ao processar a solicitação:', error);
        }
    };

    useEffect(() => {
        loadPosts();
    }, []);

    return (
        <>
            <Head title="Home" />
            <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                <div className="">
                    {successMessage && (
                        <div className="alert alert-success mt-3" role="alert">
                            {successMessage}
                            <button onClick={() => setShowSuccessMessage(false)}>X</button>
                        </div>
                    )}
                    <div className="container">
                        <div className="bg-secondary text-center p-3 d-flex align-items-center" style={{ borderRadius: '20%', width: '145px', height: '70px', marginTop: '10px', marginRight: '10px', marginBottom: '10px' }}>
                            <h1>LOGO</h1>
                        </div>
                    </div>

                    <div className="bg-secondary p-0.5 opacity-50"></div>

                    <div>
                        <Button className="text-bg-success p-3 d-grid gap-2 col-6 mx-auto" variant="primary" onClick={handleOpenModal} style={{ marginTop: '20px', marginBottom: '20px' }}>
                            Criar Postagem
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