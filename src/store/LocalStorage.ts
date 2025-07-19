import { useState, useEffect } from "react";

export function usePersistentState<T>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  });

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === key && event.newValue !== null) {
        setState(JSON.parse(event.newValue));
      }
    };

    const handleCustomEvent = (event: CustomEvent) => {
      if (event.detail.key === key) {
        setState(event.detail.value);
      }
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("localStorageUpdate", handleCustomEvent as EventListener);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("localStorageUpdate", handleCustomEvent as EventListener);
    };
  }, [key]);

  const update: React.Dispatch<React.SetStateAction<T>> = (val) => {
    const nextValue = typeof val === "function" ? (val as (prev: T) => T)(state) : val;
    localStorage.setItem(key, JSON.stringify(nextValue));
    setState(nextValue);

    window.dispatchEvent(
      new CustomEvent("localStorageUpdate", {
        detail: { key, value: nextValue },
      })
    );
  };

  return [state, update];
}
