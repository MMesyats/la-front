import { IVehicle } from "@/Types";

export interface IVehicleTableData {
  isUpdateModalOpen: boolean;
  isCreateModalOpen: boolean;
  selectedForEdit: IVehicle | null;
  sortKey: string;
  isASC: boolean;
  vehicleTableHeader: { label: string; key: string }[];
  vehicles: IVehicle[];
}
