import type { BranchCreate, BranchPaginatedResponse, BranchResponse, UpdateBranch } from "~/lib/models/Branch";
import type { ApiResponse } from "~/lib/models/util";

const mockBranches: BranchResponse[] = [
  {
    id: "b1",
    name: "Dodoma HQ",
    location: "Dodoma",
    type: "head_office",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "b2",
    name: "Dar es Salaam Sub-HQ",
    location: "Dar es Salaam",
    type: "sub_hq",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "b3",
    name: "Arusha Branch",
    location: "Arusha",
    type: "branch",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "b4",
    name: "Mbeya Branch",
    location: "Mbeya",
    type: "branch",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "b5",
    name: "Mtwara Branch",
    location: "Mtwara",
    type: "branch",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "b6",
    name: "Mwanza Branch",
    location: "Mwanza",
    type: "branch",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "b7",
    name: "Zanzibar Sub-HQ",
    location: "Zanzibar",
    type: "sub_hq",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
]

const mockBranchResponse: BranchPaginatedResponse = {
  items: mockBranches,
  total: mockBranches.length,
  page: 1,
  size: 20,
  pages: 1,
  stats: {
    branch: 5,
    head_office: 1,
    sub_hq: 1
  }
}

export const useBranchApi = () => {
    return {
        createBranch: (payload: BranchCreate) =>
            Promise.resolve({ message: "Branch created", data: mockBranches[0] } as ApiResponse<BranchResponse>),

        getBranches: (page: number = 1, size: number = 20, search?: string, branchType?: string) =>
            Promise.resolve(mockBranchResponse),

        getBranch: (branchId: string) =>
            Promise.resolve({ message: "Success", data: mockBranches.find(b => b.id === branchId) || mockBranches[0] } as ApiResponse<BranchResponse>),

        updateBranch: (branchId: string, payload: UpdateBranch) =>
            Promise.resolve({ message: "Branch updated", data: mockBranches[0] } as ApiResponse<BranchResponse>),

        searchBranch: (query: string) =>
            Promise.resolve(mockBranchResponse),

        filterBranch: (branch_type: string | "head_office" | "sub_hq" | "branch") =>
            Promise.resolve(mockBranchResponse),

        deleteBranch: (branchId: string) =>
            Promise.resolve({ message: "Branch deleted" }),
    };
}