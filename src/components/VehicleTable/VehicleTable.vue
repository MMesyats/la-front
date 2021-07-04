<template>
  <la-button :text="'Add Item'" @click="toggleCreateModal"> </la-button>
  <la-table
    :header="vehicleTableHeader"
    :currentSortKey="sortKey"
    :isASC="isASC"
    @sort="sort"
  >
    <VehicleRow
      v-for="vehicle in sortedVehicles"
      :key="vehicle.id"
      :id="vehicle.id"
      :type="vehicle.type"
      :licensePlate="vehicle.licensePlate"
      :model="vehicle.model"
      :purchaseDate="vehicle.purchaseDate"
      :mileage="vehicle.mileage"
      :status="vehicle.status"
      @remove="removeItem"
      @edit="openEditModal"
    />
  </la-table>
  <la-modal
    v-if="isUpdateModalOpen && selectedForEdit != null"
    @close="toggleUpdateModal"
  >
    <vehicle-form
      :id="selectedForEdit.id"
      :licensePlate="selectedForEdit.licensePlate"
      :type="selectedForEdit.type"
      :model="selectedForEdit.model"
      :mileage="selectedForEdit.mileage"
      :status="selectedForEdit.status"
      :purchaseDate="selectedForEdit.purchaseDate"
      @cancel="toggleUpdateModal"
      @submit="updateItem"
    ></vehicle-form>
  </la-modal>
  <la-modal v-if="isCreateModalOpen" @close="toggleCreateModal">
    <vehicle-form
      @cancel="toggleCreateModal"
      @submit="createItem"
    ></vehicle-form>
  </la-modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import VehicleRow from "./VehicleRow.vue";
import { IVehicleTableData } from "./Types";
import VehicleForm from "./VehicleForm.vue";
import { IVehicle } from "@/Types";
import { VehicleService } from "../../services/VehicleService";

export default defineComponent({
  name: "VehicleTable",
  components: {
    VehicleRow,
    VehicleForm,
  },
  data(): IVehicleTableData {
    return {
      isUpdateModalOpen: false,
      isCreateModalOpen: false,
      sortKey: "id",
      isASC: true,
      selectedForEdit: null,
      vehicles: [],
      vehicleTableHeader: [
        { label: "Id", key: "id" },
        { label: "License Plate", key: "licensePlate" },
        { label: "Model", key: "model" },
        { label: "Type", key: "type" },
        { label: "Purchase Date", key: "purchaseDate" },
        { label: "Mileage", key: "mileage" },
        { label: "Status", key: "status" },
      ],
    };
  },
  computed: {
    sortedVehicles(): IVehicle[] {
      const sortedArray = [...this.vehicles];
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
  async mounted() {
    this.getVehicles();
  },
  methods: {
    getVehicles() {
      VehicleService.listVehicles().then((data) => (this.vehicles = data));
    },
    openEditModal(selectedId: number) {
      this.selectedForEdit =
        this.vehicles.find(({ id }) => selectedId === id) || null;
      this.toggleUpdateModal();
    },
    toggleUpdateModal() {
      this.isUpdateModalOpen = !this.isUpdateModalOpen;
    },
    toggleCreateModal() {
      this.isCreateModalOpen = !this.isCreateModalOpen;
    },
    sort(key: string) {
      if (key === this.sortKey) this.isASC = !this.isASC;
      else this.isASC = true;
      this.sortKey = key;
    },
    async removeItem(markedForDelete: number) {
      await VehicleService.deleteVehicle(markedForDelete);
      this.vehicles = this.vehicles.filter(({ id }) => id !== markedForDelete);
    },
    async createItem(createdItem: IVehicle) {
      const newItem = await VehicleService.createVehicle(createdItem);
      this.vehicles.push(newItem);
      this.toggleCreateModal();
    },
    async updateItem(updatedVehicle: IVehicle) {
      const newVehicle = await VehicleService.updateVehicles(updatedVehicle);
      this.vehicles = this.vehicles.map((vehicle) => {
        if (vehicle.id === newVehicle?.id) vehicle = newVehicle;
        return vehicle;
      });
      this.toggleUpdateModal();
    },
  },
});
</script>
