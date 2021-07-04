import { IRoute } from "../Types";

const url = process.env?.BACKEND_URL || "http://localhost:3000";

export class RouteService {
  static async listRoutes(): Promise<IRoute[]> {
    const response = await fetch(`${url}/route/list`);
    const vehicles = (await response.json()) as IRoute[];
    return vehicles.map(({ departure, arrival, ...data }) => ({
      departure: new Date(departure),
      arrival: new Date(arrival),
      ...data,
    }));
  }
  private static async saveRoute(
    { vehicle, ...data }: IRoute,
    method: "PUT" | "POST"
  ): Promise<IRoute> {
    const response = await fetch(`${url}/route`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ vehicle: vehicle?.id || null, ...data }),
    });
    const { arrival, departure, ...routeData } =
      (await response.json()) as IRoute;
    return {
      arrival: new Date(arrival),
      departure: new Date(departure),
      ...routeData,
    };
  }

  static async updateRoute(data: IRoute): Promise<IRoute> {
    return await this.saveRoute(data, "PUT");
  }
  static async addRoute(data: IRoute): Promise<IRoute> {
    return await this.saveRoute(data, "POST");
  }

  static async removeRoute(id: number): Promise<IRoute> {
    const response = await fetch(`${url}/route/${id}`, { method: "DELETE" });
    const { arrival, departure, ...routeData } =
      (await response.json()) as IRoute;
    return {
      arrival: new Date(arrival),
      departure: new Date(departure),
      ...routeData,
    };
  }
}
