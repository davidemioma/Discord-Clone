"use client";

import React from "react";
import { Badge } from "./ui/badge";
import { pusherClient } from "@/lib/pusher";

const SocketIndicator = () => {
  if (pusherClient.connection.state !== "connected") {
    return (
      <Badge className="bg-yellow-600 text-white border-none" variant="outline">
        Fallback<span className="hidden sm:inline">: Polling every 1s.</span>
      </Badge>
    );
  }

  return (
    <Badge className="bg-emerald-600 text-white border-none" variant="outline">
      Live<span className="hidden sm:inline">: Real time updates.</span>
    </Badge>
  );
};

export default SocketIndicator;
