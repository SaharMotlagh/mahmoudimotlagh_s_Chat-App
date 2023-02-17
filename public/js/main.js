//imports go at the top
import ChatMsg from './components/ChatMessage.js';


var socket = io();

//utility function for socket

function setUserID({ sID }) {
  vm.socketID = sID;
}
function addNewMessage(message) {
    
    vm.messages.push(message);
}

//function handleTypingEvent(user) {
 // console.log('someone is typing');
  //document.querySelector('.alart').getElementsByClassName.display = "block";
//}
//
function DisconnectEvent(user) {
  console.log('chat user left the chat');
  document.querySelector('.alart').getElementsByClassName.display = "block";
}

const { createApp } = Vue

const vm = createApp({
    data() {
      return {
        socketID: '',
        message: '',
        messages: [],
        nickname: ''
      }
    },

    methods: {
        dispatchMessage() {
            //console.log('send a message to the chat service')

            socket.emit('chat_message', {
               content: this.message, 
               name: this.nickname || 'anonymous', 
               id: this.socketID

              })

            this.message = '';
        
    },

    dispatchTypingEvent() {
      //send the typing notification to the server
      socket.emit('typing_event', {user: this.nickname || 'anonymous'})
    }
  ,
  
  //
    dispatchDisconnectEvent () {
      socket.emit('disconnect_event', {
        name: this.nickname || 'anonymous'})
    }  
  },

    components: {
        newmsg: ChatMsg

    }
  }).mount('#app')

  socket.addEventListener('connected', setUserID);
  socket.addEventListener('new-message', addNewMessage);
  socket.addEventListener('typing', handleTypingEvent);
  //
  socket.addEventListener('disconnect_event', DisconnectEvent);