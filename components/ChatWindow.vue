<template>
    <div class="chat-window d-flex flex-column justify-end">
       <div class="messages" ref="msg">
        
            <Message v-for="(mes,i) in messages"
                     :key="i"
                     :mes="mes" 
                     :id="id"/> 
         
       </div>
       <v-row class="send-message  mx-2">
              <v-textarea  label="Your message"
                           v-model="message"
                           auto-grow
                           outlined
                           dense
                           rows="1"
                           row-height="15">
            </v-textarea>
            <v-btn icon class="ml-1" @click="sendMsg({id:id,txt:message})">
                <v-icon :color="message ? '#0072b3' : ''" large>mdi-send-circle-outline</v-icon>
            </v-btn>
       </v-row>                  
    </div>
</template>

<script>
    import Message from '../components/Message'
    import {mapState,mapActions} from 'vuex'
    
    export default {
        name: 'ChatWindow',
        components: {
            Message
        },
        props: ['id'],
        data: () => ({
            message: '',
            
        }),
        methods: {
            ...mapActions(['addMessage']),
            sendMsg(data){
                this.message = ''
                if(data.txt != 0) this.addMessage(data)
                this.$emit("send")
            },
            
        },
        computed: {
            ...mapState(['leftUser','rightUser','messages']),
                   
        }   
    }
</script>

<style scoped>
    .chat-window {
        height: 100%;
    }
    
    .messages {
       flex: 1 0 0;  
       overflow: auto;
    }
    
    .send-message {
         flex:  0 1 auto;
    }
    
    .v-input {
        width: 110px;
    }
</style>