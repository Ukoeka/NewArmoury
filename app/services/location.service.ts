
import { useApi } from "~/composables/util/useApi";
import { LocationType, type LocationCreate, type LocationPaginatedResponse, type LocationResponse, type UpdateLocation } from "~/lib/models/Location";
import type { ApiResponse, PaginatedResponse, SearchResponse } from "~/lib/models/util";

const BASE = "/api/v1/locations";

export const useLocationApi = () => {
    const api = useApi();

    return {

        createLocation: (payload: LocationCreate) =>
            api.post<ApiResponse<LocationResponse>>(BASE, payload),

        getLocations: (page: number = 1, size: number = 20, search?: string, locationType: LocationType = LocationType.IN_OFFICE) =>
            api.get<LocationPaginatedResponse>(BASE, {
                params: {
                    page,
                    size,
                    ...(search?.trim() && { search }),
                    ...(locationType?.trim() && { location_type: locationType }),
                }
            }),
        getLocation: (locationId: string) =>
            api.get<ApiResponse<LocationResponse>>(`${BASE}/${locationId}`),

        updateLocation: (locationId: string, payload: UpdateLocation) =>
            api.patch<ApiResponse<LocationResponse>>(`${BASE}/${locationId}`, payload),

        deleteLocation: (locationId: string) =>
            api.delete<{ message: string }>(`${BASE}/${locationId}`),

    };
};
