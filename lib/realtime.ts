type RealtimePayload = Record<string, unknown>;

declare global {
  // eslint-disable-next-line no-var
  var __io:
    | {
        emit: (event: string, payload: RealtimePayload) => void;
        to: (room: string) => { emit: (event: string, payload: RealtimePayload) => void };
      }
    | undefined;
}

export function emitRealtime(event: string, payload: RealtimePayload) {
  global.__io?.emit(event, payload);
}

export function emitToRole(role: string, event: string, payload: RealtimePayload) {
  global.__io?.to(`role:${role}`).emit(event, payload);
}

export function emitToUser(userId: string, event: string, payload: RealtimePayload) {
  global.__io?.to(`user:${userId}`).emit(event, payload);
}
