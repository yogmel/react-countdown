# React Contagem Regressiva

Aplicação de contagem regressiva.

## Como utilizar

A aplicação registra a data completa (dia, mês e ano) na url como parâmetros. Se ele não reconhece um valor válido, ele redireciona para a rota do Date picker (do Airbnb, que usa Momentjs).

Você pode manualmente colocar a data na url que ele funciona. No momento da montagem do componente, ele verifica se existem parâmetros válidos já na url.

Exemplo:
`https://countdown-link.com/?day=27&month=2&year=2021` vai mostrar a contagem regressiva do dia atual para a data **27/02/2021**.

## Instalação e inicialização

```
$ git clone https://github.com/yogmel/react-countdown
$ cd react-countdown
$ npm install
$ npm start
```

## Todo

- [x] Adicionar a interface para adicionar input
  - [x] Reroute para página de seleção se algum valor for `null`
- [ ] Estilizar app
- [x] Adicionar lista de mensagens para serem mostradas em algum momentos da contagem regressiva
- [ ] Refatorar código
- [ ] Estudar localization
