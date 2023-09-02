const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowSecundario = addKeyword(['2', 'siguiente']).addAnswer(['📄 Aquí tenemos el flujo secundario'])

const flowEvents = addKeyword(['event', 'events', 'evento', 'eventos']).addAnswer(
    [
        '📅 *Upcoming events:*',
        'https://esncastellon.org/eventos',
    ],
    null,
    null,
    [flowSecundario]
)

const flowOffice = addKeyword(['office', 'oficina']).addAnswer(
    [
        'The office is open this week on *Tuesday* from *18:00 to 19:30* and on *Wednesday, Thursday and Friday* from *16:00 to 17:30*.\n',
        'Office location: https://youtu.be/CqHfhF-qSa0',
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
    'The ESNcard costs 15€ '],
    null,
    null,
    [flowOffice]
)

const flowPrincipal = addKeyword(['hola', 'ole', 'alo', 'hello', 'hi', 'hey'])
    .addAnswer('🙌 Welcome to the *ESN Castellón* chatbot')
    .addAnswer(
        [
            '👉 *office* to see the office hours and location',
            '👉 *ESNcard* to see how to get your ESNcard',
            '👉 *events* to see the upcoming events',
        ],
        null,
        null,
        [flowOffice, flowEvents, flowESNCard]
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
