import React, { useState } from 'react';
import { Card } from 'react-bootstrap';

//Logica para exibir apenas 500 caracteres ao maximo, com o "leia mais..." e "Mostrar menos"
const PostContent = ({ type, text, image }) => {
    const maxLength = 500;
    const [showFullText, setShowFullText] = useState(false);

    const truncatedText = text.length > maxLength ? `${text.slice(0, maxLength)}` : text;

    const handleToggleText = () => {
        setShowFullText(!showFullText);
    };

    return (
        <>
            <div>
                <Card.Subtitle className="mb-2 text-muted">{type}</Card.Subtitle>

                <Card.Text className="lh-base post-text">
                    {showFullText ? text : truncatedText}
                    {text.length > maxLength && (
                        <button className="btn btn-link" onClick={handleToggleText}>
                            {showFullText ? 'Mostrar menos' : 'Ler mais...'}
                        </button>
                    )}

                </Card.Text>

                <div className="relative sm:flex sm:justify-center sm:items-center">
                    {image && (
                        <Card.Img
                            variant="top"
                            src={`http://127.0.0.1:8000/storage/${image}`}
                            alt={`Imagem do post`}
                            style={{
                                width: '400px',
                                height: '300px',
                                marginRight: '10px',
                            }}
                        />
                    )}
                </div>
            </div>

            <style>{`
                .post-text {
                    font-family: 'Lato', 'Source Sans Pro', sans-serif;
                }
        `}</style>
        </>
    );
};

export default PostContent;