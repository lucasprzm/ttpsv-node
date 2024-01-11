# Teste Técnico Prático Seidor Veritas

![GitHub repo size](https://img.shields.io/github/repo-size/lucasprzm/diligence-hub-test?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/lucasprzm/diligence-hub-test?style=for-the-badge)

> Uma API construída utilizando Node.js para o teste técnico da Seidor Veritas.

## Funcionalidades

### Back-end

- [x] Automóvel:
  - [x] Cadastrar um novo automóvel;
  - [x] Atualizar um automóvel cadastrado;
  - [x] Excluir um automóvel cadastrado;
  - [x] Recuperar um automóvel cadastrado pelo seu identificador único;
  - [x] Listar os automóveis cadastrados. Deve ser possível filtrar a listagem dos automóveis por cor e marca.
- [x] Motoristas:
  - [x] Cadastrar um novo motorista;
  - [x] Atualizar um motorista cadastrado;
  - [x] Excluir um motorista cadastrado;
  - [x] Recuperar um motorista cadastrado pelo seu identificador único;
  - [x] Listar os motoristas cadastrados. Deve ser possível filtrar a listagem dos motoristas por nome.
- [x] Utilização de um automóvel:
  - [x] Criar um registro que represente a utilização de um automóvel por um motorista, com uma data de início e um texto do motivo de utilização;
  - [x] Finalizar a utilização de um automóvel por um motorista guardando a data de finalização;
  - [x] Listar os registros de utilização cadastrados no sistema com o nome do motorista e as informações do automóvel utilizado.

## Frameworks e Bibliotecas externas

### Back-end

- Node.js - ambiente de execução JavaScript para criação de aplicações sem depender de um browser para execução.
- Express - Framework para aplicações web com Node.js.
- Prisma - ORM para realizar as queries do banco de dados.
- SQLite - banco de dados.

## 💻 Pré requisitos do projeto

Antes de começar, verifique se você tem os requisitos a seguir:

- Versão LTS mais recente do NodeJS

## 🚀 Instalação

- Clone o projeto desse repositório;
- Para instalar o projeto, siga as etapas seguintes para o front-end e back-end.

### Back-end

Abra o terminal de sua preferência e instale as dependências do projeto com o seguinte comando:

```
npm install
```

Após a instalação, utilize o comando seguinte para rodar o servidor:

```
npm run dev
```

Pronto! O back-end estará rodando na porta 3000 no servidor local e as requisições já podem ser feitas.

```
http://localhost:3000
```

Link da documentação: [Postman](https://documenter.getpostman.com/view/18322573/2s9YsM8qcr)

## 🤝 Desenvolvedores

<table>
  <tr>
    <td align="center">
      <a href="#">
        <img src="https://avatars.githubusercontent.com/u/60558571?v=4" width="100px;" alt="Lucas's picture on GitHub"/><br>
        <sub>
          <b>Lucas Prazeres de Matos</b>
        </sub>
      </a>
    </td>
  </tr>
</table>
