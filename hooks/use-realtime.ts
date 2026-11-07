"use client";

import { useEffect, useRef } from "react";
import { io, type Socket } from "socket.io-client";

interface UseRealtimeOptions {
  role?: string;
  userId?: string;
  onEvent?: (event: string, payload: unknown) => void;
  events?: string[];
}

export function useRealtime({ role, userId, onEvent, events = [] }: UseRealtimeOptions) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL ?? "http://localhost:3000", {
      path: "/socket.io",
      transports: ["websocket", "polling"]
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      socket.emit("subscribe", { role, userId });
    });

    events.forEach((eventName) => {
      socket.on(eventName, (payload) => {
        onEvent?.(eventName, payload);
      });
    });

    return () => {
      events.forEach((eventName) => socket.off(eventName));
      socket.disconnect();
    };
  }, [events, onEvent, role, userId]);

  return socketRef.current;
}
