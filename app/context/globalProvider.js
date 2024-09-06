"use client";
import React, { createContext, useState, useContext } from "react";
import themes from "./theme";
import axios from "axios";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export const GlobalProvider = ({ children }) => {
  const { user } = useUser();

  const [selectedTheme, setSelectedTheme] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [collapsed, setCollapsed] = useState(true);

  const [lowkers, setLowkers] = useState([]);

  const theme = themes[selectedTheme];

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const collapseMenu = () => {
    setCollapsed(!collapsed);
  };

  const allLowkers = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/api/lowkers");

      const sorted = res.data.sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });

      setLowkers(sorted);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteLowker = async (id) => {
    try {
      const res = await axios.delete(`/api/lowkers/${id}`);
      toast.success("Lowker deleted");

      allLowkers();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const updateLowker = async (lowker) => {
    try {
      const res = await axios.put(`/api/lowkers`, lowker);

      toast.success("Lowker updated");

      allLowkers();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  React.useEffect(() => {
    if (user) allLowkers();
  }, [user]);

  const formatRupiah = (salary)=> {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(salary);
  }

  return (
    <GlobalContext.Provider
      value={{
        theme,
        lowkers,
        formatRupiah,
        deleteLowker,
        isLoading,
        updateLowker,
        modal,
        openModal,
        closeModal,
        allLowkers,
        collapsed,
        collapseMenu,
      }}
    >
      <GlobalUpdateContext.Provider value={{}}>
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);
