<template>
  <div class="Logged">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link class="navbar-brand mr-auto" to="/">All Galleries</router-link>
      <ul class="navbar-nav">       
        <li class="nav-item" >
          <router-link class="nav-link" to="/my-galleries">My Galeries</router-link> 
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/create">Create new Gallery</router-link> 
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/logout">Logout</router-link> 
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Logged',

}
</script>
<style scoped>

</style>