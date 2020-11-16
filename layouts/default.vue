<template>
    <v-app app>
       <!--Окно пользователя Ивана Иванова (справа)-->
        <v-navigation-drawer app 
                             :right="true" 
                             v-model="rDrawer" 
                             :permanent="rDrawer" 
                             :mini-variant="screenMobile && miniView"
                             disable-resize-watcher>
            <v-list dense nav dense nav class="py-0">
                <v-list-item two-line>
                    <v-list-item-avatar @click="clickShowDrawer">
                        <img :src="rightUser[0].avatar">
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title>{{ rightUser[0].title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-divider></v-divider>

                <v-list-item v-if="!screenMobile || !miniView"
                             v-for="user in rightUser[0].interlocutors" 
                             :key="user.id" 
                             @click="activeForMsg({user:'right',id:user.id})" 
                             link>
                    <v-list-item-content>
                        <v-list-item-title>{{ user.name }}</v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-icon>
                        <v-icon :color="user.active == true ? 'blue' : 'grey'">mdi-comment</v-icon>
                    </v-list-item-icon>

                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <!--Окно вошедшего пользователя (слева)-->
        <v-navigation-drawer app 
                             v-model="lDrawer" 
                             :permanent="lDrawer" 
                             :mini-variant="screenMobile  && miniView" 
                             disable-resize-watcher>
            <v-list dense nav dense nav class="py-0">
                <v-list-item two-line>
                    <v-list-item-avatar @click="clickShowDrawer">
                        <img :src="leftUser[0].avatar">
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title>{{ leftUser[0].title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-divider></v-divider>

                <v-list-item v-if="!screenMobile || !miniView"
                             v-for="user in leftUser[0].interlocutors" 
                             :key="user.id" 
                             @click="activeForMsg({user:'left',id:user.id})"
                             link>
                    <v-list-item-content>
                        <v-list-item-title>{{ user.name }}</v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-icon>
                        <v-icon :color="user.active == true ? 'blue' : 'grey'">mdi-comment</v-icon>
                    </v-list-item-icon>

                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <!--Верхняя полоска, в мобильной версии служит навигацией-->
        <v-app-bar app>
            <v-btn v-if="rDrawer && this.$vuetify.breakpoint.smAndDown" @click="activeDrawer">
               <v-icon>mdi-account</v-icon>
               <div v-if="!this.$vuetify.breakpoint.xs" class="d-flex justify-center">
                     first person 
               </div>
            </v-btn>
            <v-spacer></v-spacer>
            
                <h1 v-if="miniView">Chat</h1>
           
            <v-spacer></v-spacer>
            <v-btn v-if="lDrawer && this.$vuetify.breakpoint.smAndDown" @click="activeDrawer">
               <div v-if="!this.$vuetify.breakpoint.xs" class="d-flex justify-center">
                      second person 
               </div>
                <v-icon>mdi-account</v-icon>
            </v-btn>
        </v-app-bar>
        <!--Центральное поле, чат-->
        <v-main>
            <div class="chat_content">
                <nuxt/> 
            </div>
        </v-main>
    </v-app>
</template>

<script>
    import {mapState,mapActions} from 'vuex'
    
    export default {
        data() {
            return {
                lDrawer: true,
                rDrawer: true,
                miniView: true
            }
        },
        computed: {
            ...mapState(['leftUser','rightUser']),

           screenTablet(){
                if(this.$vuetify.breakpoint.smAndDown) {
                    console.log('this.rDrawer',this.rDrawer)
                    console.log('this.lDrawer',this.lDrawer)
                    return true
                }
                else {
                    
                    return false}
            },
            screenMobile(){
                if(this.$vuetify.breakpoint.xs) return true
                else return false
            }
        },
        methods: {
            ...mapActions({
                activeForMsg: 'changeActiveUserForMsg',
                activeUser: 'changeActiveUser'
            }),
            activeDrawer() {
                this.lDrawer = !this.lDrawer
                this.rDrawer = !this.rDrawer
                this.activeUser()
           },
           clickShowDrawer(){
               if(this.$vuetify.breakpoint.xs) this.miniView = !this.miniView  
           }, 
        },
        watch: {
           screenTablet(val){
                console.log('val',val)
               val ? this.rDrawer = false : this.rDrawer = true
               val ? this.lDrawer = true : this.lDrawer = true
           }
        },
        created(){
            if(this.$vuetify.breakpoint.smAndDown){
                this.rDrawer = false
                this.lDrawer = true
            }
            /*if(this.$vuetify.breakpoint.mdAndUp) {
                this.rDrawer = true
                this.lDrawer = true 
            }*/
        }    
    }

</script>

<style scoped>
    .chat_content {
        height: 100%;
    }
</style>
