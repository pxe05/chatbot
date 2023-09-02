const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowSecundario = addKeyword(['2', 'siguiente']).addAnswer(['📄 Aquí tenemos el flujo secundario'])

const flowOffice = addKeyword(['office', 'oficina']).addAnswer(
    [
        'The office is closed during the summer'
    ],
    null,
    null,
    [flowSecundario]
)

const flowTuto = addKeyword(['tutorial', 'tuto']).addAnswer(
    [
        '🙌 Aquí encontras un ejemplo rapido',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowGracias = addKeyword(['gracias', 'grac']).addAnswer(
    [
        '🚀 Puedes aportar tu granito de arena a este proyecto',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowESNCard = addKeyword(['esncard', 'card']).addAnswer(
    ['*HOW TO get your ESNcard:*\n' +
    '1️⃣Fill the form (https://esncastellon.org/esncard).\n' +
    '2️⃣Bring an ID picture and Learning Agreement \n' +
    '3️⃣Come to our office! https://youtu.be/CqHfhF-qSa0\n' +
    'The ESNcard costs 15€ ', '\n*2* Para siguiente paso.'],
    null,
    null,
    [flowSecundario]
)

const flowPrincipal = addKeyword(['hola', 'ole', 'alo', 'hello', 'hi', 'hey'])
    .addAnswer('🙌 Welcome to the *ESN Castellón* chatbot')
    .addAnswer(
        [
            '👉 *office* to see the office hours and location',
            '👉 *graciass*  para ver la lista de videos',
            '👉 *ESNcard* to see how to get your ESNcard',
        ],
        null,
        null,
        [flowOffice, flowGracias, flowTuto, flowESNCard]
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal, flowOffice])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
