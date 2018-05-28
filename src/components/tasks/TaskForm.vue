<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-btn fab dark slot="activator" color="red lighten-1" icon>
      <v-icon>add</v-icon>
    </v-btn>
    <v-card>
      <v-card-title>
        <span class="headline">Add new task</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm6 md4>
              <v-text-field required :error="error" label="title" v-model="editedItem.title" @focus="error = false"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field multi-line label="description" v-model="editedItem.desc"></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="close" >Cancel</v-btn>
        <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    name: 'task-form',
    data () {
      return {
        dialog: false,
        error: false,
        editedItem: {
          id: '',
          title: '',
          desc: ''
        }
      }
    },
    methods: {
      ...mapActions([
        'saveTask',
        'createTask',
        'clearTaskForm'
      ]),
      save () {
        if (this.editedItem.title === '') {
          this.error = true
          return
        }
        this.editedItem.id ? this.saveTask({...this.taskToEdit, ...this.editedItem}) : this.createTask({...this.editedItem})
        this.close()
      },
      close () {
        this.dialog = !this.dialog
        this.error = false
        this.editedItem.id = ''
        this.editedItem.title = ''
        this.editedItem.desc = ''
        this.$store.dispatch('clearTaskForm')
      }
    },
    props: [
      'taskToEdit'
    ],
    watch: {
      taskToEdit (newVal) {
        if (newVal && newVal.id) {
          this.dialog = true
          this.editedItem.id = newVal.id
          this.editedItem.title = newVal.title
          this.editedItem.desc = newVal.desc
        }
      }
    }
  }
</script>

<style scoped>

</style>
