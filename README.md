## Inventory Manager

Este projeto foi desenvolvido como solução para a proposta de um teste técnico, com o objetivo de criar um sistema de gerenciamento de estoque, contendo uma API backend construída com Java Spring e um frontend desenvolvido com TypeScript, React, Next e Redux.

Você pode saber mais sobre o desenvolvimento e as decisões tomadas lendo o seguinte arquivo: [walkthrough.md](./walkthrough.md).

## Execução do projeto
- Docker
- Para rodar o projeto utilizando Docker, basta executar o comando abaixo na raiz do projeto:
```bash
docker-compose up --build
```
- O frontend estará disponível em: http://localhost:3000
- A API backend estará disponível em: http://localhost:8080

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

## Relacionamento entre as entidades

- Um *Product* tem uma *Recipe*.
- Uma *Recipe* é composta por várias *RawMaterials* através da entidade *RecipeItem*.
- Uma *RawMaterial* pode estar presente em várias *Recipes*.