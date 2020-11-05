<template>
    <div>
 
        <logged v-if="isLoggedIn"/>
      
        <unlogged v-else/>

    </div>
</template>

<script>
import { store } from '../store/index';

import Unlogged from './Unlogged'
import Logged from './Logged'
import { mapGetters } from 'vuex';
export default {
  name: 'Navbar',
  components: {
      Unlogged,
      Logged
  },
  computed:{
      ...mapGetters({isLoggedIn: 'AuthModule/isLoggedIn'}),
     
  }




}
</script>