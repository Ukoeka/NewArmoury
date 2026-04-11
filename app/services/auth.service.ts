import type { LoginResponse, RefreshToken, RequestOtp, VerifyOtp } from "~/lib/models/Auth";

const mockUser = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  username: "admin",
  email: "admin@armoury.tz",
  first_name: "System",
  surname: "Administrator",
  initial: "S",
  file_number: "ADM001",
  title: "Administrator",
  department: "IT",
  directorate: "Operations",
  phone_number: "+255 123 456 789",
  status: "active",
  is_superuser: true,
  last_login: new Date().toISOString(),
  role_id: "role-admin-001",
  branch_id: "branch-hq-001",
  role: {
    id: "role-admin-001",
    name: "system_admin",
    abbreviation: "SYSTEM_ADMIN",
    description: "Full system access",
    is_system: true,
    permissions: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  branch: {
    id: "branch-hq-001",
    name: "Dodoma HQ",
    location: "Dodoma",
    type: "head_office",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
}

export const useAuthApi = () => {
  return {
    requestOtp: (payload: RequestOtp) =>
      Promise.resolve({ message: "OTP sent" }),

    verifyOtp: (payload: VerifyOtp) =>
      Promise.resolve({ message: "Verified" }),

    refreshToken: (payload: RefreshToken) =>
      Promise.resolve({ message: "Token refreshed" }),

    login: (username: string, password: string) => {
      return Promise.resolve({
        access_token: "mock-access-token",
        refresh_token: "mock-refresh-token",
        token_type: "Bearer",
        user: mockUser
      } as LoginResponse);
    },

    logout: () => {
      return Promise.resolve({ message: "Logged out" });
    },
  };
};