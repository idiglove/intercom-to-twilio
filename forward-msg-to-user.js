exports.handler = function(context, event, callback) {
    // console.log('test');
    var striptags = require('striptags');

    console.log('event only', event);
    console.log('event.data', event.data);

    var userId = event.data.item.user.user_id;
    var convoParts = event.data.item.conversation_parts.conversation_parts;
    var body = event.data.item.conversation_parts.conversation_parts[convoParts.length-1].body.replace(/<br>/, '\n');

    var parsedBody = striptags(body);

    console.log(userId);
    console.log(parsedBody);

    var client = context.getTwilioClient();

    if(parsedBody){
        console.log('sending sms', new Date());

        client.messages.create({
            from: '+61427860314',
            to: userId,
            body: parsedBody
        }).then((message) => {
            console.log('here', new Date());
            console.log(message.sid);
            callback(null);
        }).catch((error) => {
            callback(error);
        });
    } else {
        callback(null);
    }
};