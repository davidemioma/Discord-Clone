"use client";

import React from "react";
import { Badge } from "./ui/badge";
import { usePusher } from "./providers/pusher-provider";

const SocketIndicator = () => {
  const pusher = usePusher();

  if (pusher.status !== "connected") {
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
