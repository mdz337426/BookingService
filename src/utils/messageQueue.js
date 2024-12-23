const amqplib = require('amqplib');
const {EXCHANGE_NAME,REMAINDER_BINDING_KEY, MESSAGE_BROKER_URL, QUEUE} = require('../config/serverConfig');


const createChannel =async()=>{ 
    
    const connection = await amqplib.connect(MESSAGE_BROKER_URL);
    const channel = await connection.createChannel();
    await channel.assertExchange(EXCHANGE_NAME, 'direct', false);
    return channel;
}


const subscribeMessage =async (channel, service, binding_key)=>{
   try {
    const appQueue= await channel.assertQueue(QUEUE);

    channel.bindQueue(appQueue.queue, EXCHANGE_NAME, binding_key);

    channel.consume(appQueue.queue, msg=>{
        console.log('received data');
        console.log(msg.content.toString());
        
        channel.ack(msg);
    });
   } catch (error) {
    throw error;
   } 
}

const publishMessage = async(channel, binding_key, message)=>
{
    try {
        await channel.assertQueue(QUEUE);
        await channel.publish(EXCHANGE_NAME, binding_key,Buffer.from(message));
    } catch (error) {
        throw error;
        
    }

}

module.exports = {
    subscribeMessage,
    createChannel,
    publishMessage
}


