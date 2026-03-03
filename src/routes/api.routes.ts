// src/constants/api.routes.ts

export const API_ROUTES = {
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    ME: "/auth/me",
    REFRESH: "/auth/refresh",
  },

  USERS: {
    GET_ALL: "/users",
    GET_BY_ID: (id: string) => `/users/${id}`,
    CREATE: "/users",
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
  },

  BOOKINGS: {
    GET_ALL: "/bookings",
    TODAY: "/bookings/today",
    COMPLETED: "/bookings/completed",
  },

  SERVICES: {
    GET_ALL: "/services",
    CREATE: "/services",
    UPDATE: (id: string) => `/services/${id}`,
  },
};
