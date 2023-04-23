const amqp = require('amqplib/callback_api');

amqp.connect(`amqp://localhost`,(err,connection)=>{
    if(err) throw err;
    connection.createChannel((err,channel)=>{
        if(err) throw err;
        let queueName="practice";
        channel.assertQueue(queueName,{
            durable: false
        });
        channel.consume(queueName,(mgs)=>{
            console.log(`received message: ${mgs.content.toString()}`);
            channel.ack(mgs);
        });
    });
});