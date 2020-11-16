import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () =>
    new Vuex.Store({
        state: {
            rightUser: [
                  {
                    id: 1,
                    title: 'Ivan Ivanov',
                    activeUser: false,
                    avatar: 'https://randomuser.me/api/portraits/men/81.jpg',
                    interlocutors:[
                        {
                            id: 1,
                            name: 'Ivan Ivanov',
                            active: false
                        }
                    ] 
                  }
             ],
            leftUser: [],
            messages:[]
            
        },

        getters: {
            
        },

        mutations: {
            /*заполняет профиль вошедшего пользователя и дополняет профиль существующего, раздел собеседники*/
            userProfile(state, user){
                state.leftUser = [                   
                    {
                        id: 2,
                        title: user.name,
                        activeUser: true,
                        avatar: user.avatar,
                        interlocutors: [
                            {
                                id: 2,
                                name: user.name,
                                active: false
                            },
                            {
                                id: 1,
                                name: state.rightUser[0].title,
                                active: false
                            }
                        ]
                    }
                ];
                state.rightUser[0].interlocutors.push({
                    id: 2,
                    name: user.name,
                    active: false
                })
 
            },
            /*для активации пользователя, кому отправить сообщение*/
            changeActiveUserForMsg(state, params){
                if(params.user == 'left') {
                    let index = state.leftUser[0].interlocutors.findIndex((el) => el.id === params.id)
                    state.leftUser[0].interlocutors[index].active = !state.leftUser[0].interlocutors[index].active
                }
                if(params.user == 'right') {
                    let index = state.rightUser[0].interlocutors.findIndex((el) => el.id === params.id)
                    state.rightUser[0].interlocutors[index].active = !state.rightUser[0].interlocutors[index].active
                }
                
            },
            /*используется в мобильной версии и для планшетов, в этом случае экран не делится на две части*/
            changeActiveUser(state){
                state.leftUser[0].activeUser = !state.leftUser[0].activeUser
                state.rightUser[0].activeUser = !state.rightUser[0].activeUser
            },
            /*добавление сообщения происходит в каждом профиле, в зависимости от отмеченных собеседников*/
            addMessage(state,data){
                if(data.id == 1) {
                    let arr = state.rightUser[0].interlocutors
                    let total = arr.reduce((res,item) => {if(item.active) return res + item.id
                                                          else return res
                                             }, 0)
                    switch(total) {
                        case 1: 
                            state.messages = [
                                ...state.messages,
                                {
                                    title: state.rightUser[0].title,
                                    text: data.txt,
                                    interlocutor: false,
                                    flag: 4
                                }
                            ]
                            break;
                        case 2: 
                            state.messages = [
                                ...state.messages,
                                {
                                    title: state.rightUser[0].title,
                                    text: data.txt,
                                    interlocutor: true,
                                    flag: total
                                }
                            ]
                            break; 
                        case 3: 
                            state.messages = [
                                ...state.messages,
                                {
                                    title: state.rightUser[0].title,
                                    text: data.txt,
                                    interlocutor: true,
                                    flag: total
                                }
                            ]
                            break;
                        default: break;    
                    }
                }
                if(data.id == 2) {
                    let arr = state.leftUser[0].interlocutors
                    let total = arr.reduce((res,item) => {if(item.active) return res + item.id
                                                          else return res
                                             }, 0)
                    switch(total) {
                        case 1: 
                            state.messages = [
                                ...state.messages,
                                {
                                    title: state.leftUser[0].title,
                                    text: data.txt,
                                    interlocutor: false,
                                    flag: total
                                }
                            ]
                            
                            break;
                        case 2: 
                            state.messages = [
                                ...state.messages,
                                {
                                    title: state.leftUser[0].title,
                                    text: data.txt,
                                    interlocutor: true,
                                    flag: 5
                                }
                            ]
                            break; 
                        case 3: 
                            state.messages = [
                                ...state.messages,
                                {
                                    title: state.leftUser[0].title,
                                    text: data.txt,
                                    interlocutor: true,
                                    flag: total
                                }
                            ]
                            break;
                        default: break;    
                    }
                }
                
            }
        },

        actions: {
            userProfile(store, user){
                return new Promise(function(resolve, reject){
                        store.commit('userProfile', user);
                        resolve();
				
			    });
            },
            changeActiveUserForMsg(store, params){
                return new Promise(function(resolve, reject){
                        store.commit('changeActiveUserForMsg', params);
                        resolve();
				
			    });
            },
            changeActiveUser({commit}){
                return new Promise(function(resolve, reject){
                        commit('changeActiveUser');
                        resolve();
				
			    });
            },
            addMessage({commit},data){
                return new Promise(function(resolve, reject){
                        commit('addMessage', data);
                        resolve();
				
			    });
            }
        }
    })

export default store
