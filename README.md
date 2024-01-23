# Sistema de Gerenciamento de Clientes

Bem-vindo ao Sistema de Gerenciamento de Clientes! Este projeto foi desenvolvido por [Matheusfbio](https://github.com/Matheusfbio) para fornecer uma solução eficiente e fácil de usar para gerenciar clientes em um ambiente de negócios.

## Visão Geral

O Sistema de Gerenciamento de Clientes é uma aplicação desenvolvida em React.js para o frontend, Node.js para o backend e posygres para armazenar os dados localmente, que oferece recursos abrangentes para ajudar na gestão eficiente de informações sobre clientes. Ele é projetado para ser modular, fácil de personalizar e oferece uma interface amigável para facilitar a navegação.

## Funcionalidades Principais

**Cadastro de Clientes:** Registre informações detalhadas sobre cada cliente, incluindo nome, endereço, e-mail, telefone, etc.

**Pesquisa e Filtragem:** Facilite a localização de clientes específicos por meio de recursos de pesquisa e filtros.

**Atualizações e Remoções:** Atualize facilmente as informações do cliente e remova registros quando necessário.

## Como Usar

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- Node.js (versão recomendada: 18.x)
- Yarn (gerenciador de pacotes para o Node.js)
- PostgreSQL (banco de dados relacional)

**Clone o Repositório:**

```bash
git clone https://github.com/Matheusfbio/Sistema-de-Gerenciamento-de-Clientes.git

cd Sistema-de-Gerenciamento-de-Clientes
```

Abra 2 terminais, uma para executar o frontend e o backend.

1° terminal

Instale as dependências do backend:

```bash
cd backend
yarn install
```

Crie a chamada ao banco de dados:

o arquivo esta no backend/database/db.js caso o seu usuario do postgres seja diferente do que está sendo exemplificado.

adicione o código igual aos campos pré-definidos no db.js

```bash
user=postgres
host=localhost
database=Cliente-test
password=sua-senha-do-postgres
port=5432
```

```bash
cd backend
yarn install
```

àpos instalar os pacotes

```bash
yarn dev
```

Abra alguma plataforma que executa api client com postman, apidog ou Insomina.
Navega para http://localhost:3000/api-docs/#/ e execute na plataforma de api client o /setup para gerar o banco de dados.

2° terminar

Instale as dependências do frontend:

**Execução:**

```bash
cd frontend
yarn install
```

àpos instalar os pacotes

```bash
yarn dev
```

Navegue para este link:

http://localhost:5173/

para ir o front-end.

## Contribuição

Contribuições são bem-vindas! Se você encontrar problemas, bugs ou tiver sugestões para melhorias, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Contato

Para questões ou mais informações sobre o projeto, entre em contato com Matheusfbio via email:matheusfabiorsgmail.com ou Linkedin https://www.linkedin.com/in/matheus-fabio/
