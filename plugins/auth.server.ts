import { defineNuxtPlugin } from "nuxt/app";
import { useAuth } from "../composables/useAuth";

export default defineNuxtPlugin(async () => {
  const auth = useAuth();
  try {
    await auth.fetchMe();
  } catch {}
});
