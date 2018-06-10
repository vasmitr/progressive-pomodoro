<template>
  <v-dialog v-model="showBreakForm" max-width="300px">
    <v-card>
      <v-card-title>
        <h3>Please, take a break</h3>
      </v-card-title>
      <v-card v-if="isBreak">
       <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <p class="timer">{{showTimer}}</p>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
    <v-card v-else>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-select required :items="items" label="Interval (min)" v-model="interval"></v-select>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="startTimer">Start</v-btn>
      </v-card-actions>
    </v-card>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { Timer } from '@/models'

export default {
  name: 'break-form',
  data () {
    return {
      items: [5, 30],
      interval: 5
    }
  },
  computed: {
    ...mapGetters([
      'getActiveTimer',
      'isBreak',
      'showBreakForm'
    ]),
    showTimer () {
      let timer = this.getActiveTimer
      return timer && Timer.displayTimer(timer).format('HH:mm:ss')
    }
  },
  methods: {
    startTimer () {
      this.$store.dispatch('createBreak', this.interval)
    }
  }
}
</script>

<style scoped>
  .timer {
      color: rgb(239, 83, 80);
      text-align: center;
      font-size: 2rem;
  }
</style>
