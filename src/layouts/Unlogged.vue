<template>
  <div class="unlogged">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <ul class="navbar-nav mr-auto">   
        <li>
          <router-link class="navbar-brand " to="/">All Galleries</router-link>
        </li>
      </ul>
      <ul class="navbar-nav">       
        <li class="nav-item" >
          <router-link class="nav-link" to="/login">Login</router-link> 
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/register">Register</router-link> 
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Unlogged',

}
</script>
<style scoped>

</style>