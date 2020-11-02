<template>
    <div>
        <unlogged/>
        <logged/>
    </div>
</template>

<script>
import Unlogged from './Unlogged'
import Logged from './Logged'
export default {
  name: 'Navbar',
  components: {
      Unlogged,
      Logged
  }

}
</script>