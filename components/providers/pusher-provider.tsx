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
    if (typeof window !== "undefined") {
      const pusher = pusherClient;

      pusher.connection.bind("connected", () => setStatus("connected"));

      pusher.connection.bind("disconnected", () => setStatus("disconnected"));

      pusher.connection.bind("connecting", () => setStatus("connecting"));

      pusher.connection.bind("unavailable", () => setStatus("unavailable"));

      pusher.connection.bind("error", () => setStatus("error"));

      return () => {
        pusher.disconnect();
      };
    }
  }, [pusherClient]);

  return (
    <PusherContext.Provider value={{ status }}>
      {children}
    </PusherContext.Provider>
  );
};
