"use client";
import React, { createContext, useContext, useState } from "react";

interface LoadImage {
  isLoad: boolean;
  urlImage: ArrayBuffer | string | null;
  createdAt?: Date;
  from: string;
  to: string;
}

interface Alert {
  isShow: boolean;
  currentUser: string;
  targetUser: string;
}

interface GlobalContextProps {
  showProfileSetting: boolean;
  setShowProfileSetting: React.Dispatch<React.SetStateAction<boolean>>;
  showOtherProfileSetting: boolean;
  setShowOtherProfileSetting: React.Dispatch<React.SetStateAction<boolean>>;
  showViewImage: ViewImage;
  setShowViewImage: React.Dispatch<React.SetStateAction<ViewImage>>;
  showAllContact: boolean;
  setShowAllContact: React.Dispatch<React.SetStateAction<boolean>>;
  loadImage: LoadImage;
  setLoadImage: React.Dispatch<React.SetStateAction<LoadImage>>;
  showAlert: Alert;
  setShowAlert: React.Dispatch<React.SetStateAction<Alert>>;
}

const GlobalContext = createContext<GlobalContextProps>({
  showProfileSetting: false,
  setShowProfileSetting: () => {},
  showOtherProfileSetting: false,
  setShowOtherProfileSetting: () => {},
  showViewImage: {
    isShow: false,
    image: "",
    author: "",
    createdAt: new Date(),
    profileImage: "",
  },
  setShowViewImage: () => {},
  showAllContact: false,
  setShowAllContact: () => {},
  loadImage: {
    isLoad: false,
    urlImage: "",
    createdAt: new Date(),
    from: "",
    to: "",
  },
  setLoadImage: () => {},
  showAlert: {
    isShow: false,
    targetUser: "",
    currentUser: "",
  },
  setShowAlert: () => {},
});

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [showProfileSetting, setShowProfileSetting] = useState<boolean>(false);
  const [showOtherProfileSetting, setShowOtherProfileSetting] = useState<boolean>(false);
  const [showViewImage, setShowViewImage] = useState<ViewImage>({} as ViewImage);
  const [showAllContact, setShowAllContact] = useState<boolean>(false);
  const [loadImage, setLoadImage] = useState<LoadImage>({} as LoadImage);
  const [showAlert, setShowAlert] = useState<Alert>({} as Alert);

  const contextValue: GlobalContextProps = {
    showProfileSetting,
    setShowProfileSetting,
    showOtherProfileSetting,
    setShowOtherProfileSetting,
    showViewImage,
    setShowViewImage,
    showAllContact,
    setShowAllContact,
    loadImage,
    setLoadImage,
    showAlert,
    setShowAlert,
  };

  return <GlobalContext.Provider value={contextValue}>{children}</GlobalContext.Provider>;
};

export const useGlobalContext = () => useContext(GlobalContext);
