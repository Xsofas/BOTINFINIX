const { createBot, createProvider, createFlow, addKeyword, addAnswer } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowNogracias = addKeyword(['no','No gracias']).addAnswer(['Déjanos saber porque no te interesa o si tienes alguna duda o inquietud en la que te podamos colaborar.'])


const flowSideseoiniciar = addKeyword(['Si, deseo iniciar','si','iniciar']).addAnswer(['Para que le demos inicio al servicio deberás digitar tu cedula. En este momento ya tienes un numero de ticket y un especialista ya se comunicara contigo.'])



const flowCambiodeestadodelicencia = addKeyword(['licencia','cambio','estado']).addAnswer(
    [
        'En nuestro servicio de Cambio de Estado de Licencia, nos ocupamos de facilitar y agilizar el proceso de actualización de tu licencia de conducir. Ya sea quitar suspensiones en tu licencia, nuestro equipo está aquí para ayudarte. Nos encargamos de todos los trámites. Con un enfoque rápido y confiable, te ofrecemos la tranquilidad de saber que tu licencia está en orden y lista para cualquier situación en la carretera. ¡Déjanos cuidar de los detalles para que puedas seguir adelante con confianza!',
        'Estas son nuestras políticas de nuestro servicio:',
        '* El cambio del estado de la licencia tiene un tiempo aproximado de 3 horas aproximadamente o menos dependiendo de la complejidad del registro de la infracción.',
        '* Es de aclarar que para nosotros iniciemos con el servicio deberás tener el saldo suficiente para cancelar el servicio.',
    ]
    )
 .addAnswer([
        '¿Deseas realizar el servicio?',
        '-Si, deseo iniciar',
        '-No gracias',
    ],
    null,
    null,
    [flowSideseoiniciar, flowNogracias]
    )

const flowMultasycomparendos = addKeyword(['multas','comparendos']).addAnswer(
    [             
        'En nuestro servicio de Multas, Comparendos y Acuerdos de Pago, nos encargamos de resolver tus problemas de tránsito de manera rápida y efectiva. Nos especializamos en la gestión y eliminación de multas, comparendos y acuerdos de pago. Con un equipo experto y dedicado, te ofrecemos soluciones personalizadas para recuperar tu historial de conducción y garantizar tu tranquilidad en la carretera.',
        'La limpieza del estado de cuenta tiene un tiempo aproximado de 3 horas aproximadamente o menos dependiendo de la complejidad del registro de la infracción.',       
    ])
    .addAnswer(
    [
        '¿Deseas realizar el servicio?',
        '*-Si, deseo iniciar*',
        '*-No gracias*',
    ],
    null,
    null,
    [flowSideseoiniciar, flowNogracias]
    )


const flowMovilidadytransito = addKeyword(['1', 'movilidad','transito']).addAnswer(
    [
        'En Transita +, nos especializamos en simplificar tus trámites de tránsito. Nuestro equipo de expertos está dedicado a eliminar tus comparendos y resolver cualquier problema relacionado con tu historial de conducción. Con un enfoque rápido, confiable y transparente, estamos aquí para brindarte la tranquilidad y el apoyo que necesitas en el camino. ¡Déjanos ocuparnos de los detalles para que puedas seguir adelante sin preocupaciones!'
    ])
    .addAnswer([  
        '¿Qué servicio deseas realizar?',   
        '*-Multas y comparendos*',
        '*-Cambio de estado de licencia*',
    ],
    null,
    null,
    [flowMultasycomparendos, flowCambiodeestadodelicencia, flowNogracias]
    ) 


const flowReclamosOSoporte = addKeyword(['3', 'soporte']).addAnswer(['Espera un momento… ⚠',])


const flowOtroservicio = addKeyword(['Otro servicio','2']).addAnswer(['Espera un momento… ⚠',])


const flowPrincipal = addKeyword(['hola', 'ole', 'alo']).addAnswer('👋Hola , gracias por comunicarte con Transita + ✨')    
    .addAnswer ('¡Nos alegra mucho tenerte aquí! 😊')
    .addAnswer ('Soy Daniela Sanchez, tu asistente virtual. Por favor indícame qué es lo que deseas hacer , marca el número de la opción que desear consultar.')
    .addAnswer (
        [     
            '1. Movilidad y transito🚗🚧',
            '2. Otro servicio💻📲',
            '3. Reclamos O Soporte📥',
        ],
        null,
        null,
        [flowMovilidadytransito, flowOtroservicio, flowReclamosOSoporte, flowNogracias]
    )




const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()