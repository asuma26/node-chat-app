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

jQuery('#message-form').on('submit',function (e){
  e.preventDefault();// overriding default behaviour

  socket.emit('createMessage',{
    from:'User',
    text:jQuery('[name=message]').val()//it takes the text in message box;
  },function (){

  });
});
