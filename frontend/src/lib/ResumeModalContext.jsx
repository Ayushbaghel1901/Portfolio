import { createContext, useContext, useState, useCallback } from "react";

const ResumeModalContext = createContext(null);

export function ResumeModalProvider({ children }) {
  const [open, setOpen] = useState(false);
  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);
  return (
    <ResumeModalContext.Provider value={{ open, openModal, closeModal }}>
      {children}
    </ResumeModalContext.Provider>
  );
}

export function useResumeModal() {
  const ctx = useContext(ResumeModalContext);
  if (!ctx) {
    return { open: false, openModal: () => {}, closeModal: () => {} };
  }
  return ctx;
}
