## Walkthrough do projeto

#### Este arquivo visa oferecer uma visão geral sobre o projeto e as MINHAS decisões tomadas durante o desenvolvimento.


### Arquitetura e modelagem do sistema

De início, deixando de lado linguagens e frameworks pedidos no desenvolvido, busquei entender o escopo e requisitos do projeto e então foquei em arquitetar as entidades/models do sistema.

Identifiquei 2 principais: *Produtos*, *Matérias-primas* que possuem um relacionamento entre si de um *produto* é construído por *matérias-primas* e uma *matéria-prima* pertence a vários *produtos*.
Nisso vi que tinha a possibilidade de criar uma relação usando uma tabela pivô em um relacionamento N-N entre *Produtos* e *matérias-primas* mas pensando nessa opção achei que isso criaria uma relação muito forte entre os dois modelos e que não seria tão "escalável" e dificultaria a manutenção no futuro.

Nisso adicionei uma nova entidade no sistema chamada *Receitas* deixando as relações do sistema da seguinte forma: Um *Produto* esta ligado a uma *Receita* e uma *Receita* é formada por várias *Matérias-primas* assim uma *Matéria-prima* pode estar em várias *Receitas*, com esse relacionamento entre *Receitas*-*Matérias-primas* com uma tabela pivô *Item receita*(com um campo quantidade como requisito do sistema).
Com essa tomada de decisão eu acredito que com essa modelagem o sistema fica mais legível, bem estruturado e mais fácil de aplicar manutenção.

### Desenvolvimento

No geral, o desenvolvimento do projeto(front e back end) foi tranquilo, sem grandes dificuldades relacionadas a sintaxe de linguagem ou framework, fiz a utilização de IA nas áreas onde tenho mais domínio, que é no front end, para desenvolvimento de UI, componentes visuais e montagem inicial de telas, depois de ter estruturado o projeto, no backend fiz a maior parte do desenvolvimento sozinho por conta própria mesmo, para ter mais esse aprendizado desenvolvendo a API com Java Spring.