import { create } from "zustand";
import { persist } from "zustand/middleware";

// Create a custom storage object that checks if `localStorage` is available.
// This prevents errors in non-browser environments (e.g., during server-side rendering).
const customStorage = {
  getItem: (name) => {
    // Check if `window` and `localStorage` are defined before accessing them.
    if (typeof window !== "undefined" && window.localStorage) {
      return localStorage.getItem(name);
    }
    return null;
  },
  setItem: (name, value) => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem(name, value);
    }
  },
  removeItem: (name) => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.removeItem(name);
    }
  },
};

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // Initial state
      isAuth: false,
      // Check for window to avoid errors on the server
      isSmallViewport:
        typeof window !== "undefined" ? window.innerWidth <= 900 : false,
      token:
        typeof window !== "undefined"
          ? localStorage.getItem("accessToken") || localStorage.getItem("token") || null
          : null,

      // Registration flow state
      registrationType: null,
      currentStep: 1,
      totalSteps: 1,
      registrationData: {
        // Step 1
        email: "",
        gender: "",
        name: "",
        password: "",
        phone_number: "",
        role: "",
        type_of_service: "",
        username: "",

        // Step 2
        address: {
          building_number: "",
          city: "",
          country: "",
          postal_code: "",
          state: "",
          street: "",
        },
        availability: {
          days: [],
          end_time: "",
          start_time: "",
        },
        brand_contact: "",
        brand_email: "",
        brand_logo: "",
        brand_name: "",
      },

      // Token management
      setToken: (newToken) => {
        if (typeof window !== "undefined" && window.localStorage) {
          localStorage.setItem("accessToken", newToken);
        }
        set({ token: newToken });
      },

      clearToken: () => {
        if (typeof window !== "undefined" && window.localStorage) {
          localStorage.removeItem("accessToken");
        }
        set({ token: null });
      },

      // User management
      setUser: (user) => set({ user, isAuth: true }),
      clearUser: () => set({ user: null, isAuth: false }),

      // Registration Process actions
      initRegistration: (type) => {
        const totalSteps = type === "client" ? 1 : 4;
        set({
          registrationType: type,
          currentStep: 1,
          totalSteps: totalSteps,
          registrationData: {
            email: "",
            gender: "",
            name: "",
            password: "",
            phone_number: "",
            role: "",
            type_of_service: "",
            username: "",
            address: {
              building_number: "",
              city: "",
              country: "",
              postal_code: "",
              state: "",
              street: "",
            },
            availability: {
              days: [],
              end_time: "",
              start_time: "",
            },
            brand_contact: "",
            brand_email: "",
            brand_logo: "",
            brand_name: "",
          },
        });
      },

      updateRegistrationData: (data) => {
        set((state) => ({
          registrationData: {
            ...state.registrationData,
            ...data,
          },
        }));
      },

      nextStep: () => {
        const { currentStep, totalSteps } = get();
        if (currentStep < totalSteps) {
          set({ currentStep: currentStep + 1 });
          return true;
        }
        return false;
      },

      prevStep: () => {
        const { currentStep } = get();
        if (currentStep > 1) {
          set({ currentStep: currentStep - 1 });
        }
      },

      resetRegistration: () => {
        set({
          registrationType: null,
          currentStep: 1,
          totalSteps: 1,
          registrationData: {
            email: "",
            gender: "",
            name: "",
            password: "",
            phone_number: "",
            role: "",
            type_of_service: "",
            username: "",
            address: {
              building_number: "",
              city: "",
              country: "",
              postal_code: "",
              state: "",
              street: "",
            },
            availability: {
              days: [],
              end_time: "",
              start_time: "",
            },
            brand_contact: "",
            brand_email: "",
            brand_logo: "",
            brand_name: "",
          },
        });
      },

      // Actions
      login: () => set({ isAuth: true }),
      logout: () => set({ isAuth: false }),
      checkViewport: (width) => set({ isSmallViewport: width <= 900 }),
    }),
    {
      name: "auth-storage", // A unique name for your store in localStorage
      storage: customStorage, // Use the custom storage object
    }
  )
);
