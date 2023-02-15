export default {
    name: 'TheChatMessageComponent',

    props: ['msg'],
    

    data() {
        return {

            //check to see if the message's socket ID is the same as ours
            //if it IS, float to the right
            //else float to the left
            matchedID: this.$parent.socketID == this.msg.message.id
        }
    },

    template: `
    <article class="chat-messages" :class="{ 'other-messages' : matchedID }">
        <h1>{{ msg.message.name }} says:</h1>
        <p>{{ msg.message.content }}</p>
    </article>    
      
    `,

    
    
    

}