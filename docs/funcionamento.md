# Funcionamento do VTEX Massive Orders

## Visão Geral

O VTEX Massive Orders é uma ferramenta que automatiza a criação de múltiplos pedidos na plataforma VTEX. Ela utiliza as APIs oficiais da VTEX para simular o processo completo de checkout, incluindo adição de produtos ao carrinho, cálculo de frete, escolha de forma de pagamento e finalização do pedido.

## Fluxo de Processamento

A ferramenta segue o fluxo abaixo para cada pedido:

1. **Seleção de Produtos**: 
   - Seleciona aleatoriamente produtos da lista de SKUs configurada
   - Verifica e remove duplicidades

2. **Simulação do Carrinho**:
   - Chama a API de simulação de checkout (`/api/checkout/pvt/orderforms/simulation`)
   - Passa os produtos selecionados e o CEP para cálculo de frete

3. **Criação do Pedido**:
   - Utiliza os dados retornados da simulação
   - Adiciona as informações do cliente
   - Envia para a API de criação de pedido (`/api/checkout/pub/orders`)

4. **Processamento do Pagamento**:
   - Recebe os dados da transação criada
   - Adiciona as informações de pagamento
   - Envia para a API de pagamento (`/api/pub/transactions/{id}/payments`)

5. **Confirmação do Pedido**:
   - Finaliza o processamento do pagamento
   - Chama o gateway callback para confirmar o pedido

## Execução Paralela

A ferramenta cria múltiplos pedidos simultaneamente através do uso de Promises em JavaScript:

1. Para cada pedido a ser criado, uma Promise é gerada
2. Todas as Promises são executadas em paralelo com `Promise.all()`
3. Isso permite simular múltiplos usuários realizando compras ao mesmo tempo

## Arquivos Principais

- **massive.js**: Contém a lógica principal do programa
- **config.js**: Arquivo de configuração com os parâmetros necessários

## Detalhes Técnicos

### Autenticação

A ferramenta utiliza um cookie de autenticação VTEX para fazer as requisições. Este cookie precisa ser obtido manualmente através do navegador após fazer login no admin da VTEX.

### APIs Utilizadas

As principais APIs da VTEX utilizadas são:

- **Simulação**: `https://{accountName}.myvtex.com/api/checkout/pvt/orderforms/simulation`
- **Criação de Pedido**: `https://{accountName}.myvtex.com/api/checkout/pub/orders`
- **Pagamento**: `https://{accountName}.vtexpayments.com.br/api/pub/transactions/{id}/payments`
- **Gateway Callback**: `https://{accountName}.myvtex.com/api/checkout/pub/gatewayCallback/{orderId}`

### Personalização de Produtos

A cada execução, a ferramenta seleciona aleatoriamente SKUs da lista configurada. Isso permite criar pedidos variados, simulando um comportamento mais realista.

## Monitoramento

Durante a execução, a ferramenta exibe no console os IDs dos pedidos criados com sucesso:

```
Ordem criada: A1B2C3D4E5F6G7H8I9J0
Ordem criada: B2C3D4E5F6G7H8I9J0K1
Ordem criada: C3D4E5F6G7H8I9J0K1L2
```

Em caso de erros, os detalhes são exibidos no console para facilitar a depuração.

## Limitações

- A ferramenta não realiza o processo completo de pós-venda (faturamento, envio, etc.)
- O cookie de autenticação expira após algum tempo e precisa ser renovado
- Pedidos massivos podem gerar alertas nos sistemas de segurança da VTEX

## Recomendações de Uso

- Use apenas em ambientes controlados de teste
- Monitore o impacto no ambiente durante os testes
- Coordene testes massivos com a equipe responsável pela infraestrutura
- Após os testes, cancele os pedidos criados para não impactar relatórios e métricas 