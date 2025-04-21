// /app/index.tsx
import { useRouter, useRootNavigationState } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    if (!rootNavigationState?.key) return; // todavía no ha montado

    router.replace("/views/loginScreen");
  }, [rootNavigationState?.key]);

  return null;
}
