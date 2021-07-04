<template>
  <div class="page">
    <VehicleTable />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import VehicleTable from "../components/VehicleTable/VehicleTable.vue";

export default defineComponent({
  name: "Home",
  components: {
    VehicleTable,
  },
});
</script>
