# VTEX Massive Orders

Uma ferramenta para criar múltiplos pedidos simultaneamente em lojas VTEX, útil para testes de carga e simulação de alto tráfego.

## Descrição

Esta ferramenta permite a simulação de carga em lojas VTEX criando múltiplos pedidos em paralelo. É especialmente útil para:
- Testes de performance do checkout
- Validação de integrações de pagamento e ERP
- Simulação de tráfego em períodos de alta demanda (Black Friday, datas comemorativas)
- Testes de estresse da plataforma

## Funcionamento

A ferramenta funciona criando pedidos em paralelo utilizando a API da VTEX. O fluxo inclui:
1. Simulação do carrinho de compras
2. Criação de pedido
3. Processamento de pagamento
4. Confirmação do pedido

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/thomas-ramirez/vtex-massive-order.git
cd vtex-massive-order
```

2. Instale as dependências:
```bash
npm install
```

3. Configure suas credenciais (importante):
```bash
cp config.example.js config.js
```

4. Edite o arquivo `config.js` com suas informações específicas da VTEX

## Configuração

No arquivo `config.js` você deve configurar:

- `accountName`: Nome da sua conta VTEX
- `n`: Número de pedidos paralelos a serem criados por execução
- `ni`: Número de SKUs a serem considerados na criação do pedido
- `VtexIdclientAutCookie`: Cookie de autenticação obtido do ambiente myvtex
- `postalCode`: CEP a ser considerado na simulação
- Dados do cliente fictício para teste (email, nome, documento, etc.)
- Dados de pagamento para teste
- `itemsList`: Lista de SKUs a serem considerados durante a criação dos pedidos

## Como obter o cookie de autenticação VTEX

1. Acesse o admin da sua loja VTEX (https://NOME-DA-CONTA.myvtex.com/admin)
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

- O arquivo `config.js` está incluído no `.gitignore` para evitar que informações sensíveis sejam compartilhadas acidentalmente, por isso você precisa criá-lo localmente.
- Utilize esta ferramenta apenas em ambientes de teste/homologação.
- Nunca use dados reais de cartões de crédito.
- Recomendamos usar SKUs de baixo valor, produtos específicos para teste ou produtos fora de estoque.

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests com melhorias.

## Licença

MIT 