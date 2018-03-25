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
              <v-text-field label="title"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field label="description"></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="dialog = !dialog">Cancel</v-btn>
        <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: 'task-form',
    data () {
      return {
        dialog: this.props.dialog,
        editedItem: {
          title: '',
          description: ''
        }
      }
    },
    props: [
      'dialog'
    ]
  }
</script>

<style scoped>

</style>
