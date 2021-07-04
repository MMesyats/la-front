<template>
  <div id="nav">
    <router-link to="/">Vehicles</router-link> |
    <router-link to="/routes">Routes</router-link>
  </div>
  <router-view />
</template>

<style lang="scss">
:root {
  --black-trans-color: rgba(0, 0, 0, 0.2);
  --white-color: #fff;
  --green-color: #42b983;
  --gray-color: #eee;
  --yellow-color: #d9e800;
  --red-color: #fb3737;
  --transparent: transparent;
  --bold: 700;
  --shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
}

body {
  background: var(--gray-color);
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#app {
  text-align: center;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.page {
  margin: 0 auto;
  max-width: 1200px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>
