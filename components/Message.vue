<template>
   <div :class="{interlocutor, owner}">
      <v-card color="#f0ffff" class="mb-2" width="270">
        <v-card-title>{{ mes.title }}</v-card-title>
        <v-card-text>{{ mes.text }}</v-card-text>
      </v-card> 
   </div>
</template>

<script>
    import {mapState,mapActions} from 'vuex'
    
    export default {
        name: 'Message',
        props: ['mes','id'],
        data: () => ({
            
            
        }),
        methods: {
            
        },
        computed: {
            /*если отправлено себе, то оно не отображается в окне собеседника*/
            owner(){
               if(this.mes.flag == 4 && this.id == 2) return true
               else if(this.mes.flag == 5 && this.id == 1) return true
            },
            /*если сообщение отправлено и себе и собеседнику, в своем окне выглядит, как сообщение себе*/
            interlocutor(){
                if(this.mes.flag == 3 && this.id == 1) return false
                else return this.mes.interlocutor
                if(this.mes.flag == 3 && this.id == 2) return true
                else return this.mes.interlocutor
                
            }    
        }   
    }
</script>

<style scoped>
    .interlocutor {
        display: flex;
        justify-content: flex-end;
    }
    
    .interlocutor .v-card {
        background: beige !important;
    }
    
    .owner {
        display: none;
    }
</style>