 (**************************************** Projeto Rede Social  ****************************************)

 *Informações sobre O PROJETO*

Descrição:
Feito com a integração Laravel + React. 
Uma simples rede social, com todas as funcionalidades pedidas no teste: Criar Postagem, com conteudo e imagem, Editar, Excluir e mostrar todas os Posts...

Pré-requisitos
Certifique-se de ter instalado as seguintes ferramentas:
Node.js
npm (gerenciador de pacotes do Node.js)
Composer
PHP
MySQL
Foi ultilizado o VS CODE para codificação e XAMPP Control Panel, para criar os servidores de Banco de Dados, APACHE E MYSQL

Dependencias: 
    "@inertiajs/inertia": "^0.11.1",
    "@inertiajs/inertia-react": "^0.8.1",
    "bootstrap": "^5.3.2",
    "react-bootstrap": "^2.9.1",
    "react-icons": "^4.12.0",
    "react-quill": "^2.0.0",
    "reactstrap": "^9.2.1"
    
 *PASSOS PARA INSTALAR E TESTAR O PROJETO*
 
1 - Clone o repositório

2 -Instale as dependências do Projeto Fron-End:

cd .\redeSocial\
npm install

2 -Instale as dependências do Projeto Back-End:
cd .\redeSocial\
composer install

3 - Configure o Banco de Dados:
Crie um banco de dados MySQL.
Em .env e configure as variáveis de ambiente, incluindo as credenciais do banco de dados, o Banco de dados criado para teste foi chamado de: "bdsocialnetwork"

4 - Execute as Migrações e Seeds:
php artisan migrate --seed
Inicie o Servidor:

5 - Inicie o servidor Laravel:
php artisan serve

6 - Inicie o servidor React:
npm run dev

7 - Acesse o Aplicativo:
Abra o navegador e acesse http://localhost:8000 para ver o aplicativo em execução.

O QUE FOI CRIADO, LOCALIZAÇÃO e Funcionalidades:

MODELS:
App -> Models -> Post.PHP
class model de Post, com seus atributos.

CONTROLLERS: 
App->HTTP->Controllers-> PostController.PHP
Responsavel por fazer toda a logica de controle de dados.

ROUTERS: 
Routes->Api.PHP
Criado todas as rotas da API de Post.

Routes->Web.PHP
Criado as rotas paras paginas no front e a API que carrega as Imagens em storage.

PAGES: 
resources->Pages->Home.jsx
Unica e principal pagina criada, recebe a list de Post e mostra, carrega todos os outros components visuais.

COMPONENTS:
resources->Components->CreatePostModal.jsx
Componente onde se implementou os inputs com um Modal, valida e manda para poder ser Publicado um novo POST.

resources->Components->EditPostModal.jsx
Implementa inputs com um Modal, valida e manda para poder ser Atualizado um POST.

resources->Components->Post.jsx
Carrega os card onde contem o Post e suas informações, cada Post é dividido em subcomponentes.

resources->Components->PostContent.jsx
Um dos Subcomponentes, implementa e estiliza a parte de tipo, texto e imagem do Post

resources->Components->UserInfo.jsx
Um dos Subcomponentes, implementa e estiliza a parte de author, imagem do autor e data.

resources->Components->SuccessMessage.jsx
resources->Components->ErrorMessage.jsx
Alertas de sucesso e Error, para respostas da API.

