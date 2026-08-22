"use client";

import { useState, useEffect, useCallback } from "react";
import {
  PortfolioStore,
  getStoredPortfolioData,
  saveStoredPortfolioData,
  resetStoredPortfolioData,
  PORTFOLIO_UPDATED_EVENT,
  getInitialPortfolioStore,
} from "./portfolioData";

export function usePortfolioData() {
  const [store, setStore] = useState<PortfolioStore>(getInitialPortfolioStore);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Initial client-side load
    const current = getStoredPortfolioData();
    setStore(current);
    setIsLoaded(true);

    // Listen to custom updates within the app
    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<PortfolioStore>;
      if (customEvent.detail) {
        setStore(customEvent.detail);
      } else {
        setStore(getStoredPortfolioData());
      }
    };

    // Listen to cross-tab storage updates
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "portfolio_studio_data_v1" || !e.key) {
        setStore(getStoredPortfolioData());
      }
    };

    window.addEventListener(PORTFOLIO_UPDATED_EVENT, handleUpdate);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener(PORTFOLIO_UPDATED_EVENT, handleUpdate);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const updateStore = useCallback((updater: (prev: PortfolioStore) => PortfolioStore) => {
    setStore((prev) => {
      const next = updater(prev);
      saveStoredPortfolioData(next);
      return next;
    });
  }, []);

  const setEntireStore = useCallback((newStore: PortfolioStore) => {
    setStore(newStore);
    saveStoredPortfolioData(newStore);
  }, []);

  const resetStore = useCallback(() => {
    const defaults = resetStoredPortfolioData();
    setStore(defaults);
  }, []);

  return {
    store,
    profile: store.profile,
    projects: store.projects,
    projectDetails: store.projectDetails,
    updateStore,
    setEntireStore,
    resetStore,
    isLoaded,
  };
}
