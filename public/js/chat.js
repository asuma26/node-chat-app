var socket=io();// stroes socket  in a variable and critical for makeing connections


function scrollToBottom () {
  // Selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child')
  // Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}


socket.on('connect',function(){
//  socket.on('connect', function () {
  var params = jQuery.deparam(window.location.search);

  socket.emit('join', params, function (err) {
    if (err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log('No error');
    }
  });



// socket.on('newuser',(user)=>{
//   console.log(user);
// });
//
// socket.on('newuserjoined',(joineduser)=>{
//   console.log(joineduser);
//});

});


socket.on('disconnect',function(){
  console.log('Disconnected from server');
});


socket.on('newMessage',(message)=>{
  var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
      text: message.text,
      from: message.from,
      createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();
});

socket.on('updateUserList', function (users) {
  var ol = jQuery('<ol></ol>');

  users.forEach(function (user) {
    ol.append(jQuery('<li></li>').text(user));
  });

  jQuery('#users').html(ol);
});

socket.on('newLocationMessage', function (message) {

  var formattedTime = moment(message.createdAt).format('h:mm a');
   var template = jQuery('#location-message-template').html();
   var html = Mustache.render(template, {
     from: message.from,
     url: message.url,
     createdAt: formattedTime
   });

   jQuery('#messages').append(html);

scrollToBottom();


});



jQuery('#message-form').on('submit',function (e){
  e.preventDefault();// overriding default behaviour

var messageTextbox = jQuery('[name=message]');

  socket.emit('createMessage',{
    
     text: messageTextbox.val()//it takes the text in message box;
  },function (){
messageTextbox.val('')
  });
});
//important
var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

 locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function (position) {
     locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
     locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location.');
  });
});
