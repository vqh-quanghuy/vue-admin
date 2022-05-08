<template>
  <div class="my-3" v-if="AUTHENTICATED.canView('orders')">
    <h2>Daily Sales</h2>
    <div id="chart"></div>
  </div>
  <div class="text-center fw-bold my-3" v-else>
    <span>Not Authenticated To View Chart Data</span>
  </div>
</template>

<script>
import { onMounted, computed } from 'vue';
import axios from 'axios';
import * as c3 from 'c3';
import { useStore } from 'vuex';

export default {
  name: "Dashboard",
  setup() {
    let store = useStore();
    const AUTHENTICATED = store.state.User.user;
    onMounted( async () => {
      if(AUTHENTICATED.canView('orders')){
        const CHART = c3.generate({
          bindto: '#chart',
          data: {
            x: 'x',

            columns: [
              ['x'],
              ['Sales']
            ],
            types: {
              Sales: 'bar'
            }
          },
          axis: {
            x: {
              type: 'timeseries',
              tick: {
                format: '%Y-%m-%d'
              }
            }
          }
        });

        let response = await axios.get('chart');
        const RECORDS = response.data.data;
        CHART.load({
          columns: [
            ['x', ...RECORDS.map(record => record.date)],
            ['Sales', ...RECORDS.map(record => record.sum)]
          ]
        });
      }
      
    })

    return {
      AUTHENTICATED
    }
  }
}
</script>