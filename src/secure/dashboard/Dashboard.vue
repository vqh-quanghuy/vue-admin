<template>
  <h2>Daily Sales</h2>
  <div id="chart"></div>
</template>

<script>
import { onMounted } from 'vue';
import axios from 'axios';
import * as c3 from 'c3';

export default {
  name: "Dashboard",
  setup() {
    onMounted( async () => {
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
    })
    
  }
}
</script>