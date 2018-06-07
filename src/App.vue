<template>
  <v-app>
    <v-toolbar color="red lighten-1" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Pomodoro</v-toolbar-title>
    </v-toolbar>
    <v-navigation-drawer
      v-model="drawer"
      temporary
      absolute
    >
      <v-list class="pa-1">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <v-icon>timer</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>Pomodoro</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list dense class="pt-0">
        <v-divider></v-divider>
        <v-list-tile v-for="item in routes" :key="item.title" @click="$router.push(item.location)">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer color="red lighten-1" dark app></v-footer>
  </v-app>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        drawer: false,
        routes: [
          {
            title: 'Task List',
            location: '/tasks',
            icon: 'list'
          },
          {
            title: 'Completed Task Log',
            location: '/log',
            icon: 'done'
          }
        ]
      }
    }
  }
</script>

<style>
  body {
    margin: 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

   h3 {
    text-align: center;
    width: 100%;
  }

  main {
    text-align: center;
    margin-top: 40px;
  }

  header {
    margin: 0;
    height: 56px;
    padding: 0 16px 0 24px;
    background-color: #35495E;
    color: #ffffff;
  }

  header span {
    display: block;
    position: relative;
    font-size: 20px;
    line-height: 1;
    letter-spacing: .02em;
    font-weight: 400;
    box-sizing: border-box;
    padding-top: 16px;
  }

  @media (min-width: 600px) {
    .item-wrapper {
      margin: 0;
      max-width: 50%;
    }
  }
</style>
