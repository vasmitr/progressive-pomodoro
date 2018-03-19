<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card>
        <v-card-title>Planned</v-card-title>
        <v-container>
          <v-list>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <v-icon>done</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>Hello</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon color="red lighten-1">alarm_add</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <v-icon>done</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>Hello</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon color="red lighten-1">alarm_add</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <v-icon>done</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>Hello</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon color="red lighten-1">alarm_add</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-container>
        <v-card-actions>
          <v-btn flat color="red lighten-1">
            Add new
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'task-list'
  }
</script>

<style scoped>

</style>
