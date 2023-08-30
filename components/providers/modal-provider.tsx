"use client";

import React, { useEffect, useState } from "react";
import InviteModal from "../modals/InviteModal";
import MembersModal from "../modals/MembersModal";
import EditServerModal from "../modals/EditServerModal";
import CreateServerModal from "../modals/CreateServerModal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CreateServerModal />

      <InviteModal />

      <EditServerModal />

      <MembersModal />
    </>
  );
};

export default ModalProvider;
