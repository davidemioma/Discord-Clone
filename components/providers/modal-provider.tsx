"use client";

import React, { useEffect, useState } from "react";
import InviteModal from "../modals/InviteModal";
import MembersModal from "../modals/MembersModal";
import EditServerModal from "../modals/EditServerModal";
import LeaveServerModal from "../modals/LeaveServerModal";
import CreateServerModal from "../modals/CreateServerModal";
import DeleteServerModal from "../modals/DeleteServerModal";
import CreateChannelModal from "../modals/CreateChannelModal";

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

      <CreateChannelModal />

      <LeaveServerModal />

      <DeleteServerModal />
    </>
  );
};

export default ModalProvider;
