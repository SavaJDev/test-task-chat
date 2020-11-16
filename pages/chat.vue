<template>
       <!--Окно чата разделено на две части, в мобильной версии активно окно действующего пользователя-->
        <v-row class="row_content">
            <v-col v-show="showLeft" class="left-col pb-0">
                <ChatWindow :id="2" @send="send" ref="chatWLeft"/> 
            </v-col>
            <v-col v-show="showRight" class="right-col pb-0">
                <ChatWindow :id="1" @send="send" ref="chatWRight"/> 
            </v-col>
        </v-row>
</template>

<script>
    import ChatWindow from '../components/ChatWindow'
    import {mapState,mapMutations} from 'vuex'
    
    export default {
        components: {
            ChatWindow
        },
        data: () => ({
            
        }),
        middleware: ["profile"],
        methods: {
            send(){
                let elleft = this.$refs.chatWLeft.$refs
                let elright = this.$refs.chatWRight.$refs
                this.$nextTick(() => {
				    elleft.msg.scrollTop = elleft.msg.scrollHeight - elleft.msg.clientHeight
                    elright.msg.scrollTop = elright.msg.scrollHeight - elright.msg.clientHeight
				})
            }
        },
        computed: {
            ...mapState(['leftUser','rightUser']),
            showLeft(){
                if(this.leftUser[0].activeUser && this.$vuetify.breakpoint.smAndDown || this.$vuetify.breakpoint.mdAndUp) 
                return true
            },
            showRight(){
                if(this.rightUser[0].activeUser && this.$vuetify.breakpoint.smAndDown || this.$vuetify.breakpoint.mdAndUp) 
                return true
            }
        },
        watch: {
            showRight(){
                this.send()
            }
        }    
    }

</script>

<style scoped>
    .row {
        height: 100%;
    }
    
    .left-col {
        border-right: 1px solid grey;
    }

</style>
