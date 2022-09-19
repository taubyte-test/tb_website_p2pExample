<script>
import axios from "axios";

export default {
  name: "TableView",
  data() {
    return {
      host: window.location.origin, //"http://hal.computers.com:9090",
      /** @type Array<{
       * protocol: string,
       * command: string,
       * data: string,
       * from: string,
       * to: string
       * } */
      data: [],
    };
  },

  methods: {
    async ping() {
      let response = await axios.get(this.host + "/ping");

      // only add if unique, and increment non-unique
      let found = false;
      for (let row of this.data) {
        if (row.to == response.data.to && row.from == response.data.from) {
          found = true;
          row.count += 1;
        }
      }

      if (!found) {
        response.data.count = 1;
        this.data.push(response.data);
      }
    },
  },
};
</script>

<template>
  <button @click="ping">Ping</button>
  <table>
    <thead>
      <tr>
        <th>Protocol</th>
        <th>Command</th>
        <th>Data</th>
        <th>From</th>
        <th>To</th>
        <th>Count</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in data" :key="item">
        <td>{{ item.protocol }}</td>
        <td>{{ item.command }}</td>
        <td>{{ item.data }}</td>
        <td>{{ item.from }}</td>
        <td>{{ item.to }}</td>
        <td>{{ item.count }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped></style>
