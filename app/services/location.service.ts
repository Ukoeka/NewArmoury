import { LocationType, type LocationCreate, type LocationPaginatedResponse, type LocationResponse, type UpdateLocation } from "~/lib/models/Location";
import type { ApiResponse } from "~/lib/models/util";

const mockBranch = {
  id: "b1",
  name: "Dodoma HQ",
  location: "Dodoma",
  type: "head_office",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
}

const mockLocations: LocationResponse[] = [
  {
    id: "l1",
    name: "Main Armory",
    type: "in_office",
    specific_area: "Building A - Floor 1",
    branch_id: "b1",
    branch: mockBranch,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "l2",
    name: "Sub Armory",
    type: "in_office",
    specific_area: "Building A - Floor 2",
    branch_id: "b1",
    branch: mockBranch,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "l3",
    name: "Server Room",
    type: "in_office",
    specific_area: "Building B - Data Center",
    branch_id: "b1",
    branch: mockBranch,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "l4",
    name: "VIP Protection Zone",
    type: "out_of_office",
    specific_area: "Head Office Complex",
    branch_id: "b1",
    branch: mockBranch,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "l5",
    name: "Perimeter Patrol",
    type: "out_of_office",
    specific_area: "External Perimeter",
    branch_id: "b1",
    branch: mockBranch,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
]

const mockLocationResponse: LocationPaginatedResponse = {
  items: mockLocations,
  total: mockLocations.length,
  page: 1,
  size: 20,
  pages: 1,
  stats: {
    in_office: 3,
    out_of_office: 2,
    total: 5
  }
}

export const useLocationApi = () => {
    return {
        createLocation: (payload: LocationCreate) =>
            Promise.resolve({ message: "Location created", data: mockLocations[0] } as ApiResponse<LocationResponse>),

        getLocations: (page: number = 1, size: number = 20, search?: string, locationType: LocationType = LocationType.IN_OFFICE) =>
            Promise.resolve(mockLocationResponse),

        getLocation: (locationId: string) =>
            Promise.resolve({ message: "Success", data: mockLocations.find(l => l.id === locationId) || mockLocations[0] } as ApiResponse<LocationResponse>),

        updateLocation: (locationId: string, payload: UpdateLocation) =>
            Promise.resolve({ message: "Location updated", data: mockLocations[0] } as ApiResponse<LocationResponse>),

        deleteLocation: (locationId: string) =>
            Promise.resolve({ message: "Location deleted" }),
    };
}