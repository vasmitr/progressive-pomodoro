<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-title><h3>Completed</h3></v-card-title>
        <v-container>
          <v-list>
            <template v-for="item in getCompletedTasks">
              <v-list-tile avatar :key=item.title>
                <v-list-tile-avatar>
                  <v-badge overlap color="red">
                    <span slot="badge" small>{{item && getTaskTomatoes(item.id).length}}</span>
                    <v-icon>timer</v-icon>
                  </v-badge>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{item.title}}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider :key="item.id"></v-divider>
            </template>
          </v-list>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'task-log',
  computed: {
    ...mapGetters([
      'getCompletedTasks',
      'getTaskTomatoes'
    ])
  }
}
</script>

<style scoped>

</style>

