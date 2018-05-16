<template>
  <v-container>
    <v-flex xs12>
      <v-card>
        <v-card-title><h3>Active Task</h3></v-card-title>
        <TaskCard :item="activeTask"/>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn icon @click.native="show = !show">
            <v-icon>keyboard_arrow_down</v-icon>
          </v-btn>      
        </v-card-actions>
        <v-card-text v-show="show">
          <p>{{activeTask && activeTask.desc}}</p>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-container>
</template>

<script>
import TaskCard from './TaskCard'
export default {
  name: 'active-task',
  data: () => ({
    show: false
  }),
  components: {
    TaskCard
  },
  props: [
    'activeTask'
  ]
}
</script>

<style scoped>
 
</style>

