<template>
  <v-layout row wrap>
    <ActiveTask :activeTask="getActiveTask"/>
    <v-container class="item-wrapper">
      <v-flex xs12>
        <v-flex xs12>
          <v-card>
            <v-card-title><h3>Planned</h3></v-card-title>
            <v-container class="table-wrapper">
              <v-data-table
                :items="getPlannedTasks"
                hide-actions
                item-key="id"
                :expand="true"
              >
                <template slot="items" slot-scope="props">
                  <tr 
                    @click="props.expanded = !props.expanded"
                    :class="{active: getActiveTask && getActiveTask.id === props.item.id}"
                    :key="props.item.id"
                    >
                    <td colspan="11" class="column">{{ props.item.title }}</td>
                    <td layout>
                      <v-btn icon disabled>
                        <v-icon>expand_more</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </template>
                <template slot="expand" slot-scope="props">
                  <TaskCard :item="props.item"/>
                </template>
              </v-data-table>
            </v-container>
            <v-card-actions>
              <v-container grid-list-xs text-xs-right>
                <v-layout row wrap>
                  <v-flex xs12>
                    <TaskForm :taskToEdit="taskToEdit"/>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs12>
                    <BreakForm/>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-actions>
          </v-card>
        </v-flex>
    </v-flex>
    </v-container>
  </v-layout>
</template>

<script>
  import {mapGetters} from 'vuex'

  import TaskCard from './TaskCard'
  import TaskForm from './TaskForm'
  import ActiveTask from './ActiveTask'
  import BreakForm from './BreakForm'

  const fixColspan = () => {
    // TODO: temporary fix of https://github.com/vuetifyjs/vuetify/issues/3419
    const tds = document.getElementsByClassName('datatable__expand-col')
    for (let i = 0; i < tds.length; i++) {
      tds[i].setAttribute('colspan', '42')
      //
    }
  }

  export default {
    name: 'task-list',
    components: {
      ActiveTask,
      TaskCard,
      TaskForm,
      BreakForm
    },
    computed: {
      ...mapGetters([
        'getPlannedTasks',
        'getActiveTask',
        'taskToEdit'
      ])
    },
    mounted () {
      fixColspan()
    },
    updated () {
      fixColspan()
    }
  }
</script>

<style scoped>

  .active {
    color: rgb(239, 83, 80);
  }

  .table-wrapper .column {
    text-align: left;
  }

  .table-wrapper {
    padding-top: 0;
    border-top: solid 1px lightgray;
  }

</style>
