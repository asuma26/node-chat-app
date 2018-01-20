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


socket.on('newMessage',(msg)=>{
  console.log('new message',msg);
});
