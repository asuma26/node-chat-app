var socket=io();// stroes socket  in a variable and critical for makeing connections

socket.on('connect',function(){
  console.log('connected to server');

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
  console.log('new message',message);

  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>');

  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
});



jQuery('#message-form').on('submit',function (e){
  e.preventDefault();// overriding default behaviour

var messageTextbox = jQuery('[name=message]');

  socket.emit('createMessage',{
    from:'User',
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
