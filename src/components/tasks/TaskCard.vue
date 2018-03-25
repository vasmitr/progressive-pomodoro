<template>
  <v-card flat>
    <v-card-text>
      <p>Tomatoes:
        <v-badge overlap color="red">
          <span slot="badge" small>3</span>
          <v-icon>timer</v-icon>
        </v-badge>
      </p>
    </v-card-text>
    <v-card-actions>
      <v-container grid-list-xs text-xs-center>
        <v-layout row wrap>
          <v-flex xs12>
            <v-btn v-if="!item.active" icon>
              <v-icon color="red lighten-1">alarm_add</v-icon>
            </v-btn>
            <v-btn v-else icon>
              <v-icon color="red lighten-1">update</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon color="red lighten-1">done</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon color="red lighten-1">edit</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon color="red lighten-1">delete</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    name: 'task-card',
    props: [
      'item'
    ]
  }
</script>

<style scoped>

</style>
