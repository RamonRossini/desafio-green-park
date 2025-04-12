# Condomínio Green Park

Documentação dos endpoints com <b>Swagger</b><br/>
http://localhost:3000/api

<b style="color: orangered">IMPORTANTE</b></br>
O <b>.csv</b> e o <b>.pdf</b> para os testes estão no diretório em _assets/externos_

Para testar o <b>PDF em base64</b><br/>
https://base64.guru/converter/decode/pdf


## Para rodar o projeto

Instale as dependências
```bash
$ npm install
```
E rode o projeto com
```bash
$ npm run start
```
Ou se quiser com live reload (watch mode)
```bash
$ npm run start:dev
```

## Description

Desafio técnico de back-end da Green Acesso

Em um condomínio de casas do brasil, denominado Condomínio Green Park, são utilizados 2 aplicativos, sendo um para o controle de acesso da portaria e o outro para o gerenciamento das taxas condominiais do financeiro. Após um tempo, o síndico percebeu que as pessoas estavam utilizando mais o aplicativo da Portaria que o aplicativo do Financeiro, por isso ele decidiu que iria exportar os boletos do financeiro e importar no aplicativo da Portaria.

Supondo que você trabalha na empresa que cuida do aplicativo da portaria, você será responsável por fazer um endpoint que irá receber essa importação em `.csv` e `.pdf` e passar os boletos do sistema financeiro para o sistema da portaria seguindo todas as instruções

## Passo a passo <small style="color: gray">descontinuado</small>

Para criar as entidades <b>Lotes</b> e <b>Boletos</b>
```bash
$ nest g res lotes && nest g res boletos
```

Em seguida instala o <b>TypeORM</b> e <b>PostgreSQL</b>
```bash
$ npm install @nestjs/typeorm typeorm pg
```

Para as validações de tipo instalamos o <b>Class Validator</b>
```bash
npm i --save class-validator class-transformer
```

<!-- Para as validações de tipo instalamos o <b>Class Validator</b> -->
```bash
npm i -D @types/multer
```

## Testes

- [Base64 para PDF](https://base64.guru/converter/decode/pdf)

## Contato

- Author - [Ramon Rossini](https://www.linkedin.com/in/ramon-rossini/)

## Documentações

- [NestJS Docs](https://docs.nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [CSV Parse](https://github.com/adaltas/node-csv/blob/master/packages/csv-parse/README.md)
- [Javascript String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
- [Swagger](https://swagger.io/docs/)
