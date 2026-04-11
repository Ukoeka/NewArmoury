import type { ApiResponse, HealthResponse, TaskResponse } from "~/lib/models/util";

export const useUtilityApi = () => {
    return {
        getTaskStatus: (taskId: string) =>
            Promise.resolve({ message: "Success", data: { id: taskId, status: "completed" } } as ApiResponse<TaskResponse>),

        getServerHealth: () =>
            Promise.resolve({ status: "healthy", timestamp: new Date().toISOString() } as HealthResponse),
    };
};

export function createNotificationStream(_baseURL: string, _token: string): EventSource {
    return new EventSource("about:blank")
}