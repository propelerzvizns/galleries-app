import userService from '../services/userService'
 const authModule = {
    
        namespaced:true,
        state: {
          loggedUser: JSON.parse(localStorage.getItem('user')),
          token: localStorage.getItem('token'),
  
        },
        mutations: {
          setLogin(state, payload){
            state.loggedUser = payload;
          },
          setIsLoggedIn(state, payload){
            state.loggedUser = payload;
          },
          setLogoutUser(state){
            state.loggedUser =  ''
          }
        },
        actions: {
          async login(state, payload){
            const response = await userService.login(payload)
            const loggedUser = response.data.user;
            state.commit('setLogin', loggedUser);
            localStorage.setItem('token', response.data.token.original.access_token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
          },
  
          async getLoggedIn(state){
            if(state.token){
              const isLoggedIn = await userService.getLoggedIn()
            }
            state.commit('setIsLoggedIn', isLoggedIn);
          },
          async getLogout(state, payload){
            await userService.logout(payload).then(response => {
              localStorage.removeItem('token')
              localStorage.removeItem('user')
              state.commit('setLogoutUser')
  
            })
          },
  
          async getRegister(state, payload){
            const response  = await userService.register(payload)
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            state.commit('setLogin', response.user)
          }
        },
        getters: {
        loggedUser: (state) => state.loggedUser,
        isLoggedIn: (state) => !!state.loggedUser,
        }
   
}
export default authModule;