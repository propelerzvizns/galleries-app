import Vue from 'vue'
import Vuex from 'vuex'
import userService from '../services/userService'

Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
    AuthModule: {
      namespaced:true,
      state: {
        loggedUser: JSON.parse(localStorage.getItem('user')),
        token: localStorage.getItem('token'),
        errors: {
      
        }
      },
      mutations: {
        setLogin(state, payload){
          console.log('set login mutacija', payload);
          state.loggedUser = payload;
        },
        setIsLoggedIn(state, payload){
          state.loggedUser = payload;
        },
        setError(state, payload){
          console.log('set error', payload);
        
          

      
          
            state.errors = payload
            // console.log('erros' ,state.erros);
          // state.errors.password = payload.password[0]
          console.log('state error', state.errors);


        }

      },
      actions: {
        async login(state, payload){
          // console.log('login ation', user);
          await userService.login(payload).then(response => {
         console.log('action response', response.data);
         const loggedUser = response.data.user;
         localStorage.setItem('token', response.data.token);
         localStorage.setItem('user', JSON.stringify(response.data.user));
        //  console.log('then response', response);
        state.commit('setLogin', loggedUser);
     }).catch(error => {
           const realError = error.response.data.errors;
          // this.errors.push(realError);
           console.log('catch', error);
   

          state.commit('setError', error.response.data.errors);
          console.log('pased pwd', error);

          // return error;
        
       });
          
    
          console.log('login atio, got response', payload);
    
          
    
          // console.log('commit done', loggedUser);
        },

        async getLoggedIn(state){
          console.log('actino')
          if(state.token){
            // const token = window.localStorage.token;
            const isLoggedIn = await userService.getLoggedIn()
            // console.log('actino',isLoggedIn)
            state.commit('setIsLoggedIn', isLoggedIn);
          }

         

         
      
        }
      },
      getters: {
        loggedUser: (state) => state.loggedUser,
        isLoggedIn: (state) => !!state.loggedUser,
        errors: (state) => state.errors
      }
    }
  }
})
