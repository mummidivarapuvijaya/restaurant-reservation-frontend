import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./axios";
import { Reservation, ReservationForm, ReservationUpdate, LoginResponse, LoginForm, RegisterForm } from "../schemas";
import { AxiosErrorResponse } from "../types";
import { toast } from "react-toastify";

// Query keys
export const queryKeys = {
  reservations: ["reservations"] as const,
  myReservations: ["reservations", "my"] as const,
  allReservations: ["reservations", "all"] as const,
  reservationsByDate: (date: string) => ["reservations", "by-date", date] as const,
};

// Auth mutations
export const useLogin = () => {
  return useMutation<LoginResponse, AxiosErrorResponse, LoginForm>({
    mutationFn: async (form: LoginForm) => {
      const res = await api.post<LoginResponse>("/auth/login", form);
      return res.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      toast.success("Login successful");
    },
    onError: (error: AxiosErrorResponse) => {
      toast.error(error.response?.data?.message || "Invalid credentials");
    },
  });
};

export const useRegister = () => {
  return useMutation<LoginResponse, AxiosErrorResponse, RegisterForm>({
    mutationFn: async (form: RegisterForm) => {
      const res = await api.post<LoginResponse>("/auth/register", form);
      return res.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      toast.success("Registration successful");
    },
    onError: (error: AxiosErrorResponse) => {
      toast.error(error.response?.data?.message || "Registration failed");
    },
  });
};

// Reservation queries
export const useMyReservations = () => {
  return useQuery<Reservation[], AxiosErrorResponse>({
    queryKey: queryKeys.myReservations,
    queryFn: async () => {
      try {
        const res = await api.get<Reservation[]>("/reservations/my");
        return res.data;
      } catch (error) {
        const err = error as AxiosErrorResponse;
        toast.error(err.response?.data?.message || "Failed to load reservations");
        throw error;
      }
    },
  });
};

export const useAllReservations = () => {
  return useQuery<Reservation[], AxiosErrorResponse>({
    queryKey: queryKeys.allReservations,
    queryFn: async () => {
      try {
        const res = await api.get<Reservation[]>("/reservations/all");
        return res.data;
      } catch (error) {
        const err = error as AxiosErrorResponse;
        toast.error(err.response?.data?.message || "Failed to load reservations");
        throw error;
      }
    },
  });
};

export const useReservationsByDate = (date: string) => {
  return useQuery<Reservation[], AxiosErrorResponse>({
    queryKey: queryKeys.reservationsByDate(date),
    queryFn: async () => {
      try {
        const res = await api.get<Reservation[]>(`/reservations/by-date?date=${date}`);
        return res.data;
      } catch (error) {
        const err = error as AxiosErrorResponse;
        toast.error(err.response?.data?.message || "Failed to filter reservations");
        throw error;
      }
    },
    enabled: !!date,
  });
};

// Reservation mutations
export const useCreateReservation = () => {
  const queryClient = useQueryClient();
  
  return useMutation<void, AxiosErrorResponse, ReservationForm>({
    mutationFn: async (form: ReservationForm) => {
      await api.post("/reservations", form);
    },
    onSuccess: () => {
      toast.success("Reservation booked successfully");
      queryClient.invalidateQueries({ queryKey: queryKeys.myReservations });
    },
    onError: (error: AxiosErrorResponse) => {
      toast.error(error.response?.data?.message || "Booking failed");
    },
  });
};

export const useCancelReservation = () => {
  const queryClient = useQueryClient();
  
  return useMutation<void, AxiosErrorResponse, string>({
    mutationFn: async (id: string) => {
      await api.delete(`/reservations/${id}`);
    },
    onSuccess: () => {
      toast.info("Reservation cancelled");
      queryClient.invalidateQueries({ queryKey: queryKeys.myReservations });
    },
    onError: (error: AxiosErrorResponse) => {
      toast.error(error.response?.data?.message || "Failed to cancel reservation");
    },
  });
};

export const useUpdateReservation = () => {
  const queryClient = useQueryClient();
  
  return useMutation<void, AxiosErrorResponse, { id: string; data: ReservationUpdate }>({
    mutationFn: async ({ id, data }) => {
      await api.put(`/reservations/admin/${id}`, data);
    },
    onSuccess: () => {
      toast.success("Reservation updated");
      queryClient.invalidateQueries({ queryKey: queryKeys.allReservations });
      queryClient.invalidateQueries({ queryKey: queryKeys.myReservations });
    },
    onError: (error: AxiosErrorResponse) => {
      toast.error(error.response?.data?.message || "Failed to update reservation");
    },
  });
};

export const useCancelReservationAdmin = () => {
  const queryClient = useQueryClient();
  
  return useMutation<void, AxiosErrorResponse, string>({
    mutationFn: async (id: string) => {
      await api.delete(`/reservations/admin/${id}`);
    },
    onSuccess: () => {
      toast.info("Reservation cancelled");
      queryClient.invalidateQueries({ queryKey: queryKeys.allReservations });
    },
    onError: (error: AxiosErrorResponse) => {
      toast.error(error.response?.data?.message || "Failed to cancel reservation");
    },
  });
};
