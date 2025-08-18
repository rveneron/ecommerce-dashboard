import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { io, type Socket } from 'socket.io-client';
import { OPERATOR } from 'constants/operator.enum';

interface SocketOptions {
  reconnection?: boolean;
  reconnectionAttempts?: number;
  reconnectionDelay?: number;
  timeout?: number;
}

export const AIR_QUALITY_UPDATE = 'AIR_QUALITY_UPDATE';

const BASE_API_URL = 'wss://api-challenge.dofleini.com';

const defaultQueries = {
  operator: OPERATOR.AVG,
};

export const useSocket = (query: Record<string, any> = defaultQueries) => {
  const [isConnected, setIsConnected] = useState(false);
  const [data, setData] = useState<Record<string, number> | null>(null);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const lastUpdateRef = useRef<number>(0);
  const interval = 30000;

  const defaultOptions = useMemo<SocketOptions>(
    () => ({
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 3,
      upgrade: true,
      rememberUpgrade: true,
      timeout: 20000,
      forceNew: true,
      reconnection: true,
      reconnectionDelay: 1000,
    }),
    [],
  );

  const buildUrlWithQuery = (baseUrl: string, params: Record<string, any>) => {
    const queryString = new URLSearchParams(params).toString();
    return `${baseUrl}?${queryString}`;
  };

  const connect = useCallback(() => {
    const urlWithParams = buildUrlWithQuery(BASE_API_URL, query);
    socketRef.current = io(urlWithParams, defaultOptions);

    socketRef.current.on('connect', () => {
      setIsConnected(true);
      setConnectionError(null);
      console.info(' Socket connected:', socketRef.current?.id);
      socketRef.current?.emit('subscribe', { channel: 'air-quality' });
    });

    socketRef.current.on('disconnect', (reason) => {
      setIsConnected(false);
      console.warn(' Socket disconnected:', reason);
    });

    socketRef.current.on(AIR_QUALITY_UPDATE, (data) => {
      const now = Date.now();

      const timeSinceLastUpdate = now - lastUpdateRef.current;
      if (timeSinceLastUpdate >= interval) {
        setData(data);
        lastUpdateRef.current = now;
      }
    });

    socketRef.current.on('error', (error) => {
      console.error(' Socket error:', error);
      setConnectionError((prev) => {
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        const newError = 'Socket error: ' + error.toString();
        if (prev !== newError) {
          return newError;
        }
        return prev;
      });
    });
  }, [defaultOptions, query]);

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      console.log(' Disconnecting socket');
      socketRef.current.disconnect();
      socketRef.current = null;
      setIsConnected(false);
      setConnectionError(null);
    }
  }, []);

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, [connect, disconnect, query]);

  return {
    isConnected,
    data,
    connectionError,
    socket: socketRef.current,
    disconnect,
  };
};
