import { useApi } from "~/composables/util/useApi";
import type { ApiResponse, HealthResponse, TaskResponse } from "~/lib/models/util";

export const useUtilityApi = () => {
    const api = useApi();

    return {

        getTaskStatus: (taskId: string) =>
            api.get<ApiResponse<TaskResponse>>(`/api/v1/utility/task/${taskId}`),

        getServerHealth: () =>
            api.get<HealthResponse>(`/health`),
    };
};

/**
 * Creates an SSE connection to the notifications stream.
 * Must be called client-side only (EventSource is not available on the server).
 */
export function createNotificationStream(baseURL: string, token: string): EventSource {
    return new EventSource(`${baseURL}/api/v1/notifications/stream?token=${token}`)
}
