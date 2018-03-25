<template>
  <v-card flat>
    <v-card-text>
      <p>Tomatoes:
        <v-badge overlap color="red">
          <span slot="badge" small>{{getTaskTomatoes(item.id).length}}</span>
          <v-icon>timer</v-icon>
        </v-badge>
      </p>
      <p>{{getActiveTimer && getActiveTimer.displayTimer().format('HH:mm:ss')}}</p>
    </v-card-text>
    <v-card-actions>
      <v-container grid-list-xs text-xs-center>
        <v-layout row wrap>
          <v-flex xs12>
            <v-btn v-if="!item.active" @click.stop.prevent="addTomato" icon>
              <v-icon color="red lighten-1">alarm_add</v-icon>
            </v-btn>
            <v-btn v-else icon>
              <v-icon color="red lighten-1">update</v-icon>
            </v-btn>
            <v-btn icon @click.stop.prevent="complete">
              <v-icon color="red lighten-1">done</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon color="red lighten-1">edit</v-icon>
            </v-btn>
            <v-btn icon @click.stop.prevent="remove">
              <v-icon color="red lighten-1">delete</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-actions>
  </v-card>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'task-card',
    computed: {
      ...mapGetters([
        'getTaskTomatoes',
        'getActiveTimer'
      ])
    },
    methods: {
      remove () {
        this.$store.dispatch('removeTask', this.$props.item.id)
      },
      complete () {
        this.$store.dispatch('completeTask', this.$props.item)
      },
      addTomato () {
        this.$store.dispatch('createTomato', this.$props.item.id)
      }
    },
    props: [
      'item'
    ]
  }
</script>

<style scoped>

</style>
