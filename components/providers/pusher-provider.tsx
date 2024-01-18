"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import { pusherClient } from "@/lib/pusher";

type ConnectionStatus =
  | "connected"
  | "disconnected"
  | "connecting"
  | "unavailable"
  | "error";

interface PusherType {
  status: ConnectionStatus;
}

const PusherContext = createContext<PusherType>({ status: "disconnected" });

export const usePusher = () => useContext(PusherContext);

export const PusherProvider = ({ children }: { children: React.ReactNode }) => {
  const [status, setStatus] = useState<ConnectionStatus>("disconnected");

  useEffect(() => {
    pusherClient.connection.bind("connected", () => setStatus("connected"));

    pusherClient.connection.bind("disconnected", () =>
      setStatus("disconnected")
    );

    pusherClient.connection.bind("connecting", () => setStatus("connecting"));

    pusherClient.connection.bind("unavailable", () => setStatus("unavailable"));

    pusherClient.connection.bind("error", () => setStatus("error"));

    return () => {
      pusherClient.disconnect();
    };
  }, []);

  return (
    <PusherContext.Provider value={{ status }}>
      {children}
    </PusherContext.Provider>
  );
};
