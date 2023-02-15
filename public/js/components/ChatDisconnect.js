export default {
    name: 'TheChatDisconnectComponent',

    props: ['dsc'],
    

    data() {
        return {

            //check to see if the message's socket ID is the same as ours
            //if it IS, float to the right
            //else float to the left
            matchedID: this.$parent.socketID == this.dsc.disconnect.id
        }
    },

    template: `
    <article class="disconnect_event" :class="{ 'other-disconnect' : matchedID }">
        <h1>{{ dsc.disconnect.name }} says:</h1>
        <p>{{ dsc.disconnect.content }}</p>
    </article>    
      
    `,

    
    
    

}