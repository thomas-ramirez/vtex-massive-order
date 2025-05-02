// Import config
const {
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
} = require('./config');

const axios = require('axios');
const instance = axios.create({
    headers: {
        VtexIdclientAutCookie,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

function generateRandomIntegerInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const itemSimulation = id =>
({
    id,
    "quantity": 1,
    "seller": "1"
});

const simulationRequest = (itemsSimulation) => ({
    "items": itemsSimulation,
    postalCode,
    "country": "BRA"
});

const orderPut = (items, logisticsInfo, totalPrice) => ({
    items,
    "clientProfileData": {
        email,
        firstName,
        lastName,
        document,
        "documentType": "cpf",
        phone,
        "corporateName": null,
        "tradeName": null,
        "corporateDocument": null,
        "stateInscription": null,
        "corporatePhone": null,
        "isCorporate": false
    },
    "shippingData": {
        "id": "shippingData",
        "address": {
            addressId,
        },
        logisticsInfo
    },
    "paymentData": {
        "id": "paymentData",
        "payments": [{
            accountId,
            bin,
            paymentSystem,
            "referenceValue": totalPrice,
            "value": totalPrice,
            "installments": 1
        }]
    }
})

const orderPayment = (transactionId, totalPrice) => [
    {
        "hasDefaultBillingAddress": true,
        "installmentsInterestRate": 0,
        "referenceValue": totalPrice,
        bin,
        accountId,
        "value": totalPrice,
        "tokenId": null,
        paymentSystem,
        "isBillingAddressDifferent": false,
        "fields": {
            "dueDate": null,
            validationCode,
            bin,
            accountId,
            addressId,
            "cardNumber": null
        },
        "installments": 1,
        "chooseToUseNewCard": false,
        "id": `${accountName.toUpperCase()}`,
        "interestRate": 0,
        "installmentValue": totalPrice,
        "transaction": {
            "id": `${transactionId}`,
            "merchantName": `${accountName.toUpperCase()}`
        },
        "installmentsValue": totalPrice,
        "currencyCode": "BRL",
        "originalPaymentIndex": 0,
        "groupName": "creditCardPaymentGroup"
    }
]

const orders = [];

for (let i = 0; i < n; i++) {
    let itemsSimulation = [];
    const seen = new Set();

    for (let j = 0; j < ni; j++) {
        itemsSimulation.push(itemSimulation(itemsList[generateRandomIntegerInRange(0, itemsList.length - 1)]))
    }
    //console.log(itemsSimulation)
    itemsSimulation = itemsSimulation.filter(el => {
        const duplicate = seen.has(el.id);
        seen.add(el.id);
        return !duplicate;
      });
    orders.push(createOrder(simulationRequest(itemsSimulation)))
}

Promise.all(orders);

async function createOrder(simulationRequest) {
    try {
        //Simular pedido
        const simulationResponse = await instance.post(`https://${accountName}.myvtex.com/api/checkout/pvt/orderforms/simulation?sc=1`, simulationRequest);
        const items = []
        const simulationItems = simulationResponse.data.items
        simulationItems.forEach((item) => {
            const sku = {
                "id": item.id,
                "quantity": "1",
                "seller": "1",
                "price": item.sellingPrice,
                "rewardValue": 0,
                "offerings": [],
                "isGift": item.requestIndex !== null ? false : true
            }
            items.push(sku)
        });

        const logisticInfo = []
        const simulationLogistic = simulationResponse.data.logisticsInfo
        simulationLogistic.forEach(element => {
            logisticInfo.push({
                "itemIndex": element.itemIndex,
                "selectedSla": element.slas[0].id,
                "price": element.slas[0].price
            })
        })

        let totalPrice = 0;
        simulationResponse.data.totals.forEach(item => {
            totalPrice = totalPrice + item.value
        });
        logisticInfo.forEach(element => totalPrice = totalPrice + element.price)

        //Criar pedido
        const orderResponse = await instance.put(`https://${accountName}.myvtex.com/api/checkout/pub/orders?sc=1`, orderPut(items, logisticInfo, totalPrice));

        const headers = orderResponse.headers['set-cookie'];
        let Vtex_CHKO_Auth;
        headers.forEach(cookie => {
            if (cookie.startsWith('Vtex_CHKO_Auth')) {
                Vtex_CHKO_Auth = cookie.split('=')[1].split(';')[0] + `=`
            }
        });
        const transactionId = orderResponse.data.transactionData.merchantTransactions[0].transactionId;
        const orderId = orderResponse.data.orders[0].orderGroup;

        //Criar transação
        await instance.post(`https://${accountName}.vtexpayments.com.br/api/pub/transactions/${transactionId}/payments`, orderPayment(transactionId, totalPrice));

        //Processar pagamento
        await instance.post(`https://${accountName}.myvtex.com/api/checkout/pub/gatewayCallback/${orderId}`, {}, {
            headers: {
                'Cookie': `Vtex_CHKO_Auth=${Vtex_CHKO_Auth}`
            }
        })

        console.log('Ordem criada: ' + `${orderId}`);
    }
    catch (err) {
        console.log(err)
    }
}