<script>
import axios from "axios";

export default {
  name: "TableView",

  /** @returns {import ("./types").TableView} */
  data() {
    return {
      host: window.location.origin,
      data: [],
      spinner: false,
      error: false,
      errorText: "",
    };
  },

  methods: {
    async ping() {
      this.spinner = true;
      await axios
        .get(this.host + "/ping")
        .then((response) => {
          if (response.data.error) {
            this.error = true;
            this.errorText = response.data.error;
          } else {
            this.error = false;
            this.updateData(response.data);
          }
        })
        .catch(() => {
          this.error = true;
          this.errorText = "Failed to connect to server";
        });

      this.spinner = false;
    },

    // only add if unique, and increment non-unique
    updateData(data) {
      let found = false;
      for (let row of this.data) {
        if (row.to == data.to && row.from == data.from) {
          found = true;
          row.count += 1;
        }
      }

      if (!found) {
        data.count = 1;
        this.data.push(data);
      }
    },
  },
};
</script>

<template>
  <div>
    <b-button
      :variant="error ? 'danger' : 'success'"
      @click="ping"
      :disabled="spinner"
    >
      <div class="d-flex align-items-center">
        <b-spinner small v-if="spinner"></b-spinner>
        <span class="sr-only"> {{ error ? errorText : "Ping" }}</span>
      </div>
    </b-button>
  </div>
  <br />
  <b-table striped hover :items="data">
    <template v-slot:cell(count)="row">
      <b-badge variant="success">{{ row.item.count }}</b-badge>
    </template>
  </b-table>
</template>

<style>
body {
  background: #f5f5f5 !important;
}
</style>
