# Configuração do VTEX Massive Orders

## Introdução

Este documento explica como configurar corretamente o VTEX Massive Orders para criar pedidos em massa na sua loja VTEX. A configuração correta é essencial para que a ferramenta funcione adequadamente.

## Arquivo de Configuração

O repositório inclui um arquivo modelo chamado `config.example.js` que contém a estrutura necessária para a configuração, mas com valores genéricos. **Você precisa criar seu próprio arquivo `config.js` baseado neste exemplo**.

O arquivo `config.js` não é incluído no repositório por razões de segurança, já que contém informações sensíveis como cookies de autenticação e dados de teste.

## Passo a Passo para Configuração

1. **Copie o arquivo de exemplo para criar seu arquivo de configuração**:
   ```bash
   cp config.example.js config.js
   ```

2. **Edite o arquivo `config.js` com seus dados específicos**:
   ```bash
   nano config.js   # ou use qualquer editor de sua preferência
   ```

3. **Configure os seguintes parâmetros**:

   ### Parâmetros Básicos
   - `accountName`: Nome da sua conta VTEX (ex: 'minhaloja')
   - `n`: Número de pedidos paralelos a serem criados por execução (recomendado: comece com valores baixos como 2-3)
   - `ni`: Número de SKUs a serem considerados na criação do pedido

   ### Autenticação
   - `VtexIdclientAutCookie`: Cookie de autenticação obtido do ambiente myvtex (veja instruções abaixo)

   ### Endereço e Cliente
   - `postalCode`: CEP válido para entrega
   - `email`: Email do cliente de teste
   - `firstName`: Nome do cliente
   - `lastName`: Sobrenome do cliente
   - `document`: CPF/CNPJ do cliente (apenas números)
   - `phone`: Número de telefone com DDD e país
   - `addressId`: ID do endereço cadastrado

   ### Pagamento
   - `accountId`: ID da conta de pagamento para testes
   - `bin`: 6 primeiros dígitos do cartão (BIN)
   - `paymentSystem`: Código do sistema de pagamento (ex: "4" para MasterCard)
   - `validationCode`: Código de segurança do cartão (CVV)

   ### Produtos
   - `itemsList`: Lista de SKUs válidos da sua loja para serem incluídos nos pedidos

## Como obter os valores necessários

### Cookie de Autenticação
Para obter o `VtexIdclientAutCookie`:
1. Acesse o admin da sua loja VTEX (`https://NOME-DA-CONTA.myvtex.com/admin`)
2. Faça login com suas credenciais
3. Abra as Ferramentas de Desenvolvedor do navegador (F12)
4. Vá para a aba "Application" > "Cookies"
5. Encontre o cookie chamado "VtexIdclientAutCookie"
6. Copie o valor completo

### SKUs válidos
Para obter SKUs válidos:
1. Acesse o catálogo da sua loja
2. Selecione produtos que deseja incluir nos testes
3. Anote os IDs dos SKUs (você pode ver isso na URL ao acessar o produto no admin ou via API de catálogo)

### ID do Endereço
Para obter o `addressId`:
1. Crie um pedido manualmente na loja
2. Inspecione os dados do pedido via API ou no checkout
3. Observe o addressId usado

## Exemplo de um arquivo config.js preenchido

```javascript
// Account Name
const accountName = 'minhaloja';
// Number of paralel orders created per run
const n = 3;
// Number of SKUs to be considered on order creation
const ni = 2;
// Cookie taken from the myvtex environment through the browser
const VtexIdclientAutCookie = "eyJhbGciOiJFUzI1NiIsImtpZCI6IjI..."
// PostalCode considered on the simulation
const postalCode = "04538-133"
// Client's email
const email = "teste@teste.com";
// Client's first name
const firstName = "Cliente";
// Client's last name
const lastName = "Teste";
// Client's CPF
const document = "12345678900";
// Client's phone number
const phone = "+5511999999999";
// Client's address id
const addressId = "1625680876285";

//Client's payment accountId
const accountId = "4F18E88303B1494BAF41809A443E8F6B";
//Client's payment credit card BIN
const bin = "411111";
//Client's credit card brand
const paymentSystem = "1"; // 1=Visa
// Card validation code (cvv)
const validationCode = "123";

// SKUs list to be considered randomly while creating the orders
const itemsList = [
    '12345',
    '67890',
    '54321'
]

module.exports = {
    accountName,
    n,
    ni,
    VtexIdclientAutCookie,
    postalCode,
    email,
    firstName,
    lastName,
    document,
    phone,
    addressId,
    accountId,
    bin,
    paymentSystem,
    validationCode,
    itemsList
};
```

## Considerações Importantes

1. **Segurança**: Nunca compartilhe seu arquivo `config.js` ou o commit no repositório
2. **Ambiente de Testes**: Use esta ferramenta apenas em ambientes de teste/homologação
3. **Valores de Cartão**: Utilize apenas dados de cartão de testes fornecidos pela VTEX ou gateway
4. **Performance**: Comece com valores baixos para `n` e aumente gradualmente para evitar sobrecarga

## Problemas Comuns

1. **Erro 401**: Cookie inválido ou expirado. Obtenha um novo cookie de autenticação.
2. **Erro de validação**: Dados incorretos como CEP inválido ou formato de documento incorreto.
3. **SKUs não encontrados**: Verifique se os SKUs estão ativos e disponíveis no catálogo.

## Suporte

Se precisar de ajuda adicional, abra uma issue no repositório do GitHub descrevendo seu problema detalhadamente. 