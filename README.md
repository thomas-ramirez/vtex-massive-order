# Massive Orders

Uma ferramenta para criar múltiplos pedidos simultaneamente em lojas VTEX.

## Descrição

Esta ferramenta permite a simulação de carga em lojas VTEX criando múltiplos pedidos em paralelo. É útil para testes de performance, validação de integrações e simulação de tráfego em períodos de alta demanda.

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/massive-orders.git
cd massive-orders
```

2. Instale as dependências:
```bash
npm install
```

3. Configure suas credenciais:
```bash
cp config.example.js config.js
```

4. Edite o arquivo `config.js` com suas informações (cookie de autenticação, dados de cliente, etc.)

## Configuração

No arquivo `config.js` você deve configurar:

- `accountName`: Nome da sua conta VTEX
- `n`: Número de pedidos paralelos a serem criados por execução
- `ni`: Número de SKUs a serem considerados na criação do pedido
- `VtexIdclientAutCookie`: Cookie de autenticação obtido do ambiente myvtex
- `postalCode`: CEP a ser considerado na simulação
- Dados do cliente (email, nome, sobrenome, CPF, telefone, etc.)
- Dados de pagamento (ID da conta, BIN do cartão, sistema de pagamento, etc.)
- `itemsList`: Lista de SKUs a serem considerados aleatoriamente durante a criação dos pedidos

## Como obter o cookie de autenticação VTEX

1. Acesse o admin da sua loja VTEX (https://nome-da-conta.myvtex.com/admin)
2. Faça login com suas credenciais
3. Abra as Ferramentas de Desenvolvedor do seu navegador (F12)
4. Vá para a aba "Application" > "Cookies"
5. Encontre o cookie chamado "VtexIdclientAutCookie"
6. Copie o valor e cole no seu arquivo `config.js`

## Como usar

Execute o script para criar os pedidos:

```bash
npm start
```

## Importante

- O arquivo `config.js` está incluído no `.gitignore` para evitar que informações sensíveis sejam compartilhadas acidentalmente.
- Utilize esta ferramenta apenas em ambientes de teste/homologação.
- Não use dados reais de cartões de crédito.

## Licença

MIT 