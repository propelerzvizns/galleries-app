<template>
  <div id="app">
    <navbar/>
    <router-view :key="$route.fullPath" class="container"/>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

import Navbar from './layouts/Navbar'

import userService from './services/userService';
export default {
  components: {
    Navbar
  },
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.list {
  display: flex;
  flex-wrap: wrap;
  margin-left: 125px;

}
.card{
  margin:5px 55px 5px 0;

}
</style>
