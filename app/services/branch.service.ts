import { useApi } from "~/composables/util/useApi";
import type { BranchCreate, BranchPaginatedResponse, BranchResponse, UpdateBranch } from "~/lib/models/Branch";
import type { ApiResponse } from "~/lib/models/util";

const BASE = "/api/v1/branches";

export const useBranchApi = () => {
    const api = useApi();

    return {

        createBranch: (payload: BranchCreate) =>
            api.post<ApiResponse<BranchResponse>>(BASE, payload),

        getBranches: (page: number = 1, size: number = 20, search?: string, branchType?: string) =>
            api.get<BranchPaginatedResponse>(BASE, {
                params: {
                    page,
                    size,
                    ...(search?.trim() && { search }),
                    ...(branchType?.trim() && { branch_type: branchType }),
                }
            }),
        getBranch: (branchId: string) =>
            api.get<ApiResponse<BranchResponse>>(`${BASE}/${branchId}`),

        updateBranch: (branchId: string, payload: UpdateBranch) =>
            api.patch<ApiResponse<BranchResponse>>(`${BASE}/${branchId}`, payload),

        searchBranch: (query: string) =>
            api.get<BranchPaginatedResponse>(`${BASE}/search`, { params: { q: query } }),

        filterBranch: (branch_type: string | "head_office" | "sub_hq" | "branch") =>
            api.get<BranchPaginatedResponse>(`${BASE}/branch_type`, { params: { q: branch_type } }),


        deleteBranch: (branchId: string) =>
            api.delete<{ message: string }>(`${BASE}/${branchId}`),

    };
};
