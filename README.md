# Algamoney-ui
Esse repositório contém os arquivos do **front-end** do projeto Algamoney, construído e ensinado pela [AlgaWorks](https://www.algaworks.com/) no curso **Fullstack Angular e Spring**.<br>O Algamoney é um software para controle e acompanhamento financeiro de receitas e despesas.<br>

[**Veja também o repositório com a API do back-end.**](https://github.com/israelferreira/algamoney-api)

<br>Ele foi desenvolvido com as seguintes tecnologias:

 - Back-end: **API REST** com o framework **Spring Boot** 2.5 no **Java** 16
 - Front-end: Single-Page Application (SPA) com **Angular** 10
 - Biblioteca de componentes **PrimeNG** na interface de usuário
 - Autenticação e autorização de usuário com **OAuth 2** e **JWT** (JSON Web Token)
 - Banco de dados **MariaDB** 10+
 - **Flyway** (migrações do banco de dados)
 - Jaspersoft **JasperReports** (relatórios em PDF)
 - Apache **Maven** (gerenciador de projetos e dependências)
 - Node.js e NPM (Node Package Manager) para controle de dependências e building do front-end.
 
 ## Screenshots
**Página de login**
![login](https://user-images.githubusercontent.com/37079133/89472087-00467c00-d756-11ea-9120-b064a0d19c3e.PNG)<br><br>**Dashboard com gráficos de pizza e linha com informações dos lançamentos do último mês**
![dashboard](https://user-images.githubusercontent.com/37079133/89472083-ffade580-d755-11ea-9c06-b71dfe2e6914.png)<br><br>**Página de edição de uma pessoa**
![editing person](https://user-images.githubusercontent.com/37079133/89472091-02103f80-d756-11ea-82c9-c0c28306803d.PNG)<br><br>**Inserindo informações de contato no registro de uma pessoa**
![person contact](https://user-images.githubusercontent.com/37079133/89472088-00df1280-d756-11ea-9db9-c02444c8cadd.PNG)<br><br>**Registrando um lançamento financeiro de receita**
![new journalentry](https://user-images.githubusercontent.com/37079133/89472089-0177a900-d756-11ea-911c-d993dad207db.PNG)<br><br>**Buscando um lançamento com a descrição de mercado e data de vencimento**
![searching](https://user-images.githubusercontent.com/37079133/89472097-03da0300-d756-11ea-8730-01430da920cc.png)<br><br>**Buscando as pessoas que possuem "Mari" no nome**
![searching for mari](https://user-images.githubusercontent.com/37079133/89472099-04729980-d756-11ea-82a4-c950aea117b4.png)<br><br>**Página de relatórios - definindo o intervalo da data de vencimento para o relatório a ser gerado**
![report date](https://user-images.githubusercontent.com/37079133/89472093-02a8d600-d756-11ea-8a7d-9c9c6850b9b2.PNG)<br><br>**Arquivo em PDF com o relatório de lançamentos**
![report pdf](https://user-images.githubusercontent.com/37079133/89472094-03416c80-d756-11ea-85b0-02f37c35208b.PNG)<br><br>
---
## Como executar o projeto

Para o front-end funcionar, o [Node.js](https://nodejs.org) e o NPM (Node package manager) devem estar instalados no computador.
Clone esse projeto usando o git, o comando é: `git clone https://github.com/israelferreira/algamoney-ui`.
Para executar o projeto é necessário acessar o diretório **algamoney-ui** usando o Prompt de Comandos do Node.js e baixar as dependências com o comando `npm install`.
Para iniciar o servidor de desenvolvimento, use o comando `ng serve`, a URL que deve ser acessada no navegador é [http://localhost:4200/](http://localhost:4200/).
Para colocar em produção, é necessário configurar o ambiente do projeto. Configure o arquivo src/environments/environment.prod.ts com a URL da API do Spring Boot.
Agora, de volta no Angular CLI, use o comando `ng build --prod`,  os arquivos do build ficam armazenados na pasta `dist/`.
Para o software algamoney funcionar corretamente, a API REST do back-end precisa estar em execução.

---
### Autor

Feito por Israel Ferreira. 👋🏽 Entre em contato!
[![Email Badge](https://img.shields.io/badge/-israelferreira5@outlook.com-c14438?style=for-the-badge&color=blue&link=mailto:israelferreira5@outlook.com)](mailto:israelferreira5@outlook.com)
