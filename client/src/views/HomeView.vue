<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
  import { Options, Vue } from 'vue-class-component';
  import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

  @Options({
    components: {
      HelloWorld,
    },
  })
  export default class HomeView extends Vue {
    mounted() {
      fetch('http://localhost:8001/ping')
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch(console.error);
    }
  }
</script>
