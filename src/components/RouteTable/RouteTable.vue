<template>
  <la-button :text="'Add Item'" @click="toggleCreateModal"> </la-button>
  <la-table
    :header="routeTableHeader"
    :currentSortKey="sortKey"
    :isASC="isASC"
    @sort="sort"
  >
    <RouteRow
      v-for="route in sortedRoutes"
      :key="route.id"
      :id="route.id"
      :route="route.route"
      :distance="route.cityDistance"
      :requiredType="route.requiredType"
      :price="route.price"
      :departure="route.departure"
      :arrival="route.arrival"
      :vehicle="route.vehicle"
      :status="route.status"
      @edit="openEditModal"
      @remove="removeItem"
    />
  </la-table>
  <la-modal
    v-if="selectedForEdit !== null && isUpdateModalOpen"
    @close="toggleUpdateModal"
  >
    <RouteForm
      :id="selectedForEdit.id"
      :cityStart="selectedForEdit.cityStart"
      :cityEnd="selectedForEdit.cityEnd"
      :cityDistance="selectedForEdit.cityDistance"
      :requiredType="selectedForEdit.requiredType"
      :price="selectedForEdit.price"
      :arrival="selectedForEdit.arrival"
      :departure="selectedForEdit.departure"
      :vehicle="selectedForEdit.vehicle"
      :status="selectedForEdit.status"
      :freeVehicles="avaliableVehicles"
      @submit="updateRoute"
      @cancel="toggleUpdateModal"
    />
  </la-modal>
  <la-modal v-if="isCreateModalOpen" @close="toggleCreateModal">
    <RouteForm
      :freeVehicles="avaliableVehicles"
      @submit="addRoute"
      @cancel="toggleCreateModal"
    />
  </la-modal>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { RouteService } from "../../services/RouteService";
import { IFormattedRoute, IRouteTableData } from "./Types";
import RouteRow from "./RouteRow.vue";
import RouteForm from "./RouteForm.vue";
import { VehicleService } from "../../services/VehicleService";
import { IRoute } from "@/Types";

export default defineComponent({
  components: { RouteRow, RouteForm },
  data(): IRouteTableData {
    return {
      isUpdateModalOpen: false,
      isCreateModalOpen: false,
      sortKey: "id",
      isASC: true,
      selectedForEdit: null,
      avaliableVehicles: [],
      routeTableHeader: [
        { label: "Id", key: "id" },
        { label: "Route", key: "route" },
        { label: "Distance", key: "cityDistance" },
        { label: "Required Type", key: "requiredType" },
        { label: "Price", key: "price" },
        { label: "Departure", key: "departure" },
        { label: "Arrival", key: "arrival" },
        { label: "Vehicle", key: "vehicle" },
        { label: "Status", key: "status" },
      ],
      routes: [],
    };
  },
  mounted() {
    this.getRoutes();
    this.getFreeVehicles();
  },
  computed: {
    formatedRoutes(): IFormattedRoute[] {
      return this.routes.map(({ cityStart, cityEnd, vehicle, ...data }) => ({
        route: `${cityStart}-${cityEnd}`,
        vehicle: vehicle?.licensePlate || "-",
        ...data,
      }));
    },
    sortedRoutes(): IFormattedRoute[] {
      const sortedArray = [...this.formatedRoutes];
      sortedArray.sort((itemA, itemB) => {
        return itemA[this.sortKey] >= itemB[this.sortKey]
          ? this.isASC
            ? 1
            : -1
          : this.isASC
          ? -1
          : 1;
      });
      return sortedArray;
    },
  },
  methods: {
    toggleUpdateModal() {
      this.isUpdateModalOpen = !this.isUpdateModalOpen;
    },
    toggleCreateModal() {
      this.isCreateModalOpen = !this.isCreateModalOpen;
    },
    async addRoute(data: IRoute) {
      const route = await RouteService.addRoute(data);
      this.routes.push(route);
      this.getFreeVehicles();
      this.toggleCreateModal();
    },
    async updateRoute(data: IRoute) {
      const route = await RouteService.updateRoute(data);
      this.routes = this.routes.map((r) => (r.id === route.id ? route : r));
      this.getFreeVehicles();
      this.toggleUpdateModal();
    },
    async removeItem(id: number) {
      await RouteService.removeRoute(id);
      this.routes = this.routes.filter((route) => id != route.id);
    },
    openEditModal(selectedId: number): void {
      this.selectedForEdit =
        this.routes.find(({ id }) => selectedId === id) || null;
      this.toggleUpdateModal();
    },
    sort(key: string) {
      if (key === this.sortKey) this.isASC = !this.isASC;
      else this.isASC = true;
      this.sortKey = key;
    },
    async getFreeVehicles() {
      this.avaliableVehicles = await VehicleService.listFreeVehicles();
    },
    async getRoutes() {
      this.routes = await RouteService.listRoutes();
    },
  },
});
</script>

<style lang="scss"></style>
