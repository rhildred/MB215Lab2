/**
 * Entry point
 */
$(function(){
    // gather and display messages sent from a previous session, if any
    var pastMessages = History.get();
    if(pastMessages !== false){
        for(var i=0; i<pastMessages.length; i++){
            print(pastMessages[i].message, pastMessages[i].from);
        }
    }

    // get phone number used in a previous session, if any
    var phone = getPhoneNumber();
    if(phone === false){
        phone = makeID();
        localStorage.setItem('fake-number', phone);
    }

    // auto focus to the message input, save a click yay
    $('#msg').focus();
});

/**
 * Click Event - Clear the message box and chat History
 */
$('#clear').click(function(){
    localStorage.removeItem('history');
    $('#messages').html('');
});

/**
 * Click Event - Send a message by clicking "Send"
 * @param {any} e - Click event
 */
$('#send').click(function(e){
    sendMessage();
});
/**
 * Keypress Event - Send a message by pressing "Enter"
 * @param {any} e - Keypress event
 */
$('#msg').keypress(function(e){
    if(typeof e !== 'undefined' && e.which == 13){
        sendMessage();
    }
})
/**
 * Aggregate function for sending a message
 */
function sendMessage(){
    var msg = $('#msg').val().trim();

    if(msg != ''){
        History.add(msg, 'user');
        print(msg, 'user');
        $('#msg').val('').focus();
        getNextStory(msg);
    }
}

/**
 * Send user message, get next story elements from server aka "The Magic Part"
 * @param {string} msg - User message
 */
function getNextStory(msg){
    $.post('sms', {
        body: msg,
        from: getPhoneNumber()
    }, function(data, status){
        // debug, log the status
        console.log('Story: ' + status);

        // parse the TwiML server response into simple strings
        data = $(data).find("Response").html();
        data = data.split('</Message><Message>');
        for(var i=0; i<data.length; i++){
            data[i] = data[i].replace(/\<(\/)?Message\>/gi, '');
            data[i] = data[i].replace(/\<(\/)?Response\>/gi, '');
            data[i] = data[i].replace(/([\r\n]+|\%0a+)/g, '<br>');

            // pass strings around
            History.add(data[i], 'server');
            print(data[i], 'server');
        }
    });
}

/**
 * Print a message to message container
 * @param {string} msg - Message to display
 * @param {string} from - Location message was created (user or server)
 */
function print(msg, from){
    var className = (from == 'server' ? 'from-server' : 'from-user');
    var messages = $('#messages');

    messages.append('<li class="' + className + '"><p>' + msg + '</p></li>');
    messages.animate({scrollTop: messages.prop('scrollHeight')}, 0);
}

/*** Helper Functions ***/

/**
 * Get the saved phone number if there is one
 */
function getPhoneNumber(){
    var phone = localStorage.getItem('fake-number');

    if(typeof phone === 'undefined' || phone == null){
        phone = false;
    }

    return phone;
}

/**
 * Generate an ID
 * This is used as a replacement for a phone number, since we're on a browser not a phone
 */
function makeID() {
    var id = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    // generate random id 10 characters long
    for (var i = 0; i < 10; i++){
        id += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return id;
}

/**
 * Everything History related
 */
var History = {
    /**
     * Add a message to History
     * @param {string} msg - Message to add to History
     * @param {string} from - Location message was created (user or server)
     */
    add: function(msg, from){
        var pastMessages = History.get();

        if(pastMessages === false){
            pastMessages = [{message: msg, from: from}];
        }
        else{
            pastMessages.push({message: msg, from: from});
        }

        localStorage.setItem('history', JSON.stringify(pastMessages));
    },
    /**
     * Get all history if any exists
     */
    get: function(){
        var pastMessages = localStorage.getItem('history');

        if(typeof pastMessages !== 'undefined' && pastMessages != null){
            pastMessages = JSON.parse(pastMessages);
        }
        else{
            pastMessages = false;
        }

        return pastMessages;
    }
};
