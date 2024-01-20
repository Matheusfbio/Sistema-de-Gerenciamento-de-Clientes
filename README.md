# Sistema de Gerenciamento de Clientes

Bem-vindo ao Sistema de Gerenciamento de Clientes! Este projeto foi desenvolvido por [Matheusfbio](https://github.com/Matheusfbio) para fornecer uma solução eficiente e fácil de usar para gerenciar clientes em um ambiente de negócios.

## Visão Geral

O Sistema de Gerenciamento de Clientes é uma aplicação desenvolvida em [inserir linguagem de programação aqui] que oferece recursos abrangentes para ajudar na gestão eficiente de informações sobre clientes. Ele é projetado para ser modular, fácil de personalizar e oferece uma interface amigável para facilitar a navegação.

## Funcionalidades Principais

- **Cadastro de Clientes:** Registre informações detalhadas sobre cada cliente, incluindo nome, endereço, e-mail, telefone, etc.

- **Pesquisa e Filtragem:** Facilite a localização de clientes específicos por meio de recursos de pesquisa e filtros.

- **Atualizações e Remoções:** Atualize facilmente as informações do cliente e remova registros quando necessário.

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

Instale as dependências do backend:

```bash
cd backend
yarn install
```

Crie o banco de dados:

```bash
USER=postgres
HOST=localhost
DATABASE=Cliente-test
PASSWORD=sua-senha-do-postgres
PORT=5432
```

```bash
cd backend
yarn dev
```

- Abra alguma plataforma que executa Api com postman, apidog ou Insomina.
- Navega para http://localhost:3000/api-docs/#/ e execute na plataforma de api o /setup para gerar o banco de dados.

Instale as dependências do frontend:

**Execução:**

```bash
cd frontend
yarn install
```

## Contribuição

Contribuições são bem-vindas! Se você encontrar problemas, bugs ou tiver sugestões para melhorias, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Contato

Para questões ou mais informações sobre o projeto, entre em contato com Matheusfbio via email:matheusfabiorsgmail.com ou Linkedin https://www.linkedin.com/in/matheus-fabio/

## Observaçoes

- Não foi possivel implementar a 2 parte do teste devido ao tempo curto, mas, futuramento tentarei implemente esta parte.

- Esperamos que o Sistema de Gerenciamento de Clientes seja útil para suas necessidades de gestão de clientes! Obrigado por usar espero que curta o projeto
