# Frontend

Este é o projeto Frontend desenvolvido para resolução do teste técnico com as seguintes funcionalidades:

- Acesso a CRUD das seguintes entidades disponíveis no backend: *Products*, *Raw Materials*, *Recipes*.

- Projeto desenvolvido utilizando React, Next, TypeScript, Tailwind CSS e Redux.

## Execução
Execute o backend antes de iniciar o frontend, seguindo as instruções do README do backend.

- ### Localmente
1. Clone o repositório do projeto.
2. No terminal, navegue até a pasta do frontend, instale as dependências com `npm install`.
3. Em seguida, execute `npm run dev` para iniciar o servidor

- ### Docker
1. Clone o repositório do projeto.
2. No terminal, navegue até a pasta do frontend e execute `docker build -t inventory-manager-frontend --build-arg NEXT_PUBLIC_API_URL="http://localhost:8080" .` para construir a imagem Docker.
3. Em seguida, execute `docker run -p 3000:3000 inventory-manager-frontend` para iniciar o container e acessar a aplicação em `http://localhost:3000`.