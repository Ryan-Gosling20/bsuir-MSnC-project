import { computed } from "vue";

export interface User {
  id: string;
  username: string;
  email?: string;
}

const userState = () => useState<User | null>("auth.user", () => null);
const errorState = () => useState<string | null>("auth.error", () => null);
const loadingState = () =>
  useState(
    "auth.loading",
    () =>
      ({
        register: false,
        login: false,
        logout: false,
        refresh: false,
      }) as {
        register: boolean;
        login: boolean;
        logout: boolean;
        refresh: boolean;
      },
  );

function normalizeFetchError(e: unknown): string {
  if (!e) return "Unknown error";
  const anyE = e as any;
  if (anyE?.data?.message) return String(anyE.data.message);
  if (anyE?.statusMessage) return String(anyE.statusMessage);
  if (anyE?.message) return String(anyE.message);
  try {
    return JSON.stringify(anyE);
  } catch {
    return String(anyE);
  }
}

/** API thin wrappers */
async function apiRegister(payload: {
  username: string;
  email: string;
  password: string;
  birthdate: string;
}) {
  return await $fetch("/api/register", { method: "POST", body: payload });
}
async function apiLogin(payload: { email: string; password: string }) {
  return await $fetch("/api/login", { method: "POST", body: payload });
}
async function apiLogout() {
  return await $fetch("/api/logout", { method: "POST" });
}
async function apiMe() {
  return await $fetch("/api/me", { method: "GET" });
}

export function useAuth() {
  const userRef = userState();
  const errorRef = errorState();
  const loadingRef = loadingState();

  const user = computed(() => userRef.value);
  const error = computed(() => errorRef.value);

  const loading = loadingRef.value;

  async function fetchMe() {
    loading.refresh = true;
    errorRef.value = null;
    try {
      const data = await apiMe();
      userRef.value = (data ?? null) as User | null;
    } catch {
      userRef.value = null;
    } finally {
      loading.refresh = false;
    }
  }

  async function register(payload: {
    username: string;
    email: string;
    password: string;
    birthdate: string;
  }) {
    loading.register = true;
    errorRef.value = null;
    try {
      await apiRegister(payload);
      await fetchMe();
    } catch (e) {
      errorRef.value = normalizeFetchError(e);
      throw e;
    } finally {
      loading.register = false;
    }
  }

  async function login(payload: { email: string; password: string }) {
    loading.login = true;
    errorRef.value = null;
    try {
      await apiLogin(payload);
      await fetchMe();
    } catch (e) {
      errorRef.value = normalizeFetchError(e);
      throw e;
    } finally {
      loading.login = false;
    }
  }

  async function logout() {
    loading.logout = true;
    errorRef.value = null;
    try {
      await apiLogout();
      userRef.value = null;
      await fetchMe();
    } catch (e) {
      errorRef.value = normalizeFetchError(e);
      throw e;
    } finally {
      loading.logout = false;
    }
  }

  return {
    user,
    error,
    loading,
    _refs: { userRef, errorRef, loadingRef },
    fetchMe,
    register,
    login,
    logout,
    normalizeFetchError,
  };
}
