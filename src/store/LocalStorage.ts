import { useState, useEffect } from "react";

export function usePersistentState<T>(key: string, defaultValue: T): [T, (val: T) => void] {
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

  const update = (val: T) => {
    localStorage.setItem(key, JSON.stringify(val));
    setState(val);

    // Trigger custom event to notify all hooks in the same tab
    window.dispatchEvent(
      new CustomEvent("localStorageUpdate", {
        detail: { key, value: val },
      })
    );
  };

  return [state, update];
}
