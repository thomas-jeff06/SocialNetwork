import React from 'react';
import { Card } from 'react-bootstrap';
import UserInfo from './UserInfo';
import PostContent from './PostContent';

const Post = ({ id, author, type, text, image, created_at }) => {
    return (
        <Card className="shadow w-75 mx-auto my-4">
            <Card.Body>
                <UserInfo id={id} author={author} created_at={created_at} />
                <PostContent type={type} text={text} image={image} />
            </Card.Body>
        </Card>
    );
};

export default Post;