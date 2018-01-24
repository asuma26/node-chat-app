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
  var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
      text: message.text,
      from: message.from,
      createdAt: formattedTime
    });

    jQuery('#messages').append(html);
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
