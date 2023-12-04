import React from 'react';

//Formata a data em dd/mm/aaaa e formata o horario em HH:MM
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

const UserInfo = ({ author, created_at }) => {
    return (
        <div className="d-flex flex-row mb-3">
            <div className="p-2">
                <img
                    src={`http://127.0.0.1:8000/avatar_default.png`}
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
        </div>
    );
};

export default UserInfo;