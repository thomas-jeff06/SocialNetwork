import React from 'react';
import { Card } from 'react-bootstrap';

const PostContent = ({ type, text, image }) => {
    return (
        <div>
            <Card.Subtitle className="mb-2 text-muted">{type}</Card.Subtitle>
            <Card.Text className="lh-base">{text}</Card.Text>
            {image && (
                <Card.Img
                    variant="top"
                    src={`http://127.0.0.1:8000/storage/${image}`}
                    alt={`Imagem do post`}
                    style={{}}
                />
            )}
        </div>
    );
};

export default PostContent;