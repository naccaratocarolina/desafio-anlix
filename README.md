# Desafio Anlix
Repositório onde foi feita a implementação do [desafio](https://github.com/anlix-io/desafio-anlix) proposto pela **anlix-io**.

**Status do Projeto** : Finalizado

![Badge](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Badge](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

## Tabela de Conteúdo

1. [Tecnologias utilizadas](#tecnologias-utilizadas)
2. [Requisitos](#requisitos)
3. [Instalação](#instalação)
4. [Configuração](#configuração)
5. [Uso](#uso)
6. [Arquitetura](#arquitetura)
7. [Funcionalidades](#funcionalidades)
8. [Autores](#autores)

## Tecnologias utilizadas
Essas são as frameworks e ferramentas que você precisará instalar para desenvolver esse projeto:
- **Front-end:** Angular
- **Back-end:** NodeJS

Outras tecnologias interessantes que foram implementadas:
- **Banco de dados:** mysql
- **ORM:** Sequelize

## Requisitos
Para ser possível rodar o projeto, é necessario instalar o gerenciados de pacotes **npm**, o nodejs e o angular cli. Seguem os comandos.

``` bash
$ sudo pacman -S nodejs-lts-fermium npm
```
:warning: O comando acima se refere à instalação em distros baseadas em Arch Linux.

``` bash
$ npm install -g @angular/cli
```

## Instalação
- Repositório Git<br>
  *Clone o repositorio*
``` bash
$ git clone https://github.com/naccaratocarolina/desafio-anlix
```
- Dependências<br>
  *Instale as dependências necessarias nas pastas ```/frontend``` e ```/backend```*
``` bash
$ cd /frontend
$ npm install
```

``` bash
$ cd /backend
$ npm install
```

## Configuração
*No backend, temos que criar um banco de dados para a nossa aplicação, assim como configurar o arquivo ```.env```.* <br>
*Além disso, também é necessário migrar e seedar os dados para o banco de dados.*<br>
*Segue o passo a passo. Todos os comandos abaixo devem ser rodados dentro da pasta ```/backend```*

- Banco de dados<br>
  *Crie um banco de dados no phpmyadmin ou pelo bash. Seguem instruções pelo bash.*
```
$ mysql -u <seu user> -p
MariaDB [(none)]> CREATE DATABASE anlix CHARACTER SET utf8 COLLATE utf8_bin;
```

- Crie o arquivo ```.env```<br>
  *Copie o conteudo do arquivo de exemplo ```.env.example```*
``` bash
$ cp .env.example .env
```

- Configure o arquivo ```.env```<br>
  *Adicione as informações necessárias para o backend rodar*
``` text
# DATABASE
DB_CONNECTION=mysql
DB_USERNAME=<seu user>
DB_PASSWORD=<sua senha>
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=anlix
```

- Migre as tabelas para o banco de dados
``` bash
$ node src/database/migrate.js
```

- Seedar dados para o banco de dados
``` bash
$ node src/database/seeders/Seeder.js
```

## Uso
*Para rodar o projeto a partir do terminal, siga as instruções*
- backend
``` bash
$ cd /backend
$ node src/app.js
```
- frontend
``` bash
$ cd /frontend
$ ng serve
```
<br>

*Por fim, abra a URL ```localhost:4200``` no browser de escolha.*

## Arquitetura
- O banco de dados conta com duas entidades: **Patient** e **Characteristic**. Essas entidades possuem um relacionamento one-to-many, de forma que um paciente pode possuir n características, e uma característica só pode estar associada a um único paciente;
- Para popular o banco de dados, foi criada uma seeder, **PatientSeeder**, que processa o JSON contendo os dados dos pacientes numa variável. Além dos seus
próprios dados, cada paciente possui um array de características associado a ele;
-  Somado a isso, essa seeder percorre por todos os arquivos nos diretórios que se encontram na pasta fornecida com os dados e armazena as características no array associado a cada paciente. Foi usado o CPF associado a cada característica para definir em qual paciente tal característica seria inserida;
-  Isto feito, foi possível preencher corretamente o banco de dados com as associações entre paciente e característica.

## Funcionalidades
- [x] Consultar, para cada paciente, cada uma das características individualmente e cada uma delas sendo a mais recente disponível;
- [x] Consultar em uma única chamada, todas as características de um paciente, com os valores mais recentes de cada uma;
- [x] Consultar para uma determinada data (dia, mês e ano), todas as características existentes de todos os pacientes da base de dados;
- [x] Consultar uma característica qualquer de um paciente para um intervalo de datas a ser especificado na chamada da API;
- [ ] Consultar o valor mais recente de uma característica de um paciente que esteja entre um intervalo de valores;
- [x] Consultar pacientes que contenham um nome ou parte de um nome a ser especificado na chamada da API;
- [x] Buscar um paciente por nome e exibir o valor mais recente de cada uma de suas características;
- [x] Ser possível exportar as características de um ou mais pacientes de todas as datas disponíveis para um arquivo CSV;
- [x] Exibir um gráfico temporal para um determinado paciente e uma determinada característica a ser inserida através da interface.

## Autores
- Carolina Naccarato
