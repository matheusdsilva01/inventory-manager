# API

Este é o projeto de API backend desenvolvido para resolução do teste técnico com as seguintes funcionalidades:

- CRUD das seguintes entidades: *Products*, *Raw Materials*, *Recipes*.

- Projeto desenvolvido utilizando Java e Spring.

## Execução
* Certifique-se de ter o banco de dados PostgreSQL rodando e configurado corretamente.

- ### Localmente
1. Clone o repositório do projeto.
2. No terminal, navegue até a pasta *api*, instale as dependências com `./mvnw install`.
3. Em seguida, execute `./mvnw spring-boot:run` para iniciar o servidor.

- ### Docker
1. Clone o repositório do projeto.
2. No terminal, navegue até a pasta *api* e execute `docker build -t inventory-manager-api .` para construir a imagem Docker.
3. Em seguida, execute `docker run -p 8080:8080 inventory-manager-api` para iniciar o container e acessar a API em `http://localhost:8080`.

## Você pode acessar a documentação da API pelo swagger em: http://localhost:8080/swagger-ui/index.html

## Entidades do sistema

- **Product**: 
    - id: UUID
    - name: String
    - code: String
    - price: Number
- **RawMaterial**: 
    - id: UUID
    - name: String
    - code: String
    - price: Number
- **Recipe**:
    - id: UUID
    - productId: UUID
- **RecipeItem**:
    - id: UUID
    - recipeId: UUID
    - rawMaterialId: UUID
    - quantity: Number