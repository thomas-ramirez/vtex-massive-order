// Account Name
const accountName = 'nome-da-conta';
// Number of paralel orders created per run
const n = 10;
// Number of SKUs to be considered on order creation
const ni = 5;
// Cookie taken from the myvtex environment through the browser
const VtexIdclientAutCookie = "Cole seu cookie VTEX aqui"
// PostalCode considered on the simulation
const postalCode = "00000-000"
// Client's email
const email = "email@exemplo.com";
// Client's first name
const firstName = "Nome";
// Client's last name
const lastName = "Sobrenome";
// Client's CPF
const document = "00000000000";
// Client's phone number
const phone = "+5500000000000";
// Client's address id
const addressId = "0000000000000";

//Client's payment accountId
const accountId = "INSIRA_ACCOUNT_ID";
//Client's payment credit card BIN
const bin = "000000";
//Client's credit card brand
const paymentSystem = "0"; // 1=Visa, 2=Mastercard, etc
// Card validation code (cvv)
const validationCode = "000";

// SKUs list to be considered randomly while creating the orders
const itemsList = [
    '00000000',
    '00000001',
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