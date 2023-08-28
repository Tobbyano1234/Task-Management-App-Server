import { config, Server, startDB } from '../config';
import createServer from './app';
import { Server as SocketIo, ServerOptions } from "socket.io";

const app = createServer()

const port = config.port;

let io: SocketIo | null = null;
export const startServer = async () => {
    const server = Server(app, port);
    if (config.env === 'test') {
        /**
         * Mock servers may be called at test point
         */
        return server.test();
    }
    const dbManager = startDB();
    dbManager.live(async () => {
        // Create a Socket.IO instance and attach it to the HTTP server
        io = new SocketIo(await MainServer.httpServer, MainServer.ioServerOptions);

        // Define a connection event handler for Socket.IO
        io.on('connection', (socket) => {
            console.log('A user connected');

            // Handle custom events
            socket.on('custom-event', (data) => {
                console.log('Received custom event:', data);
                // Broadcast the event to all connected clients
                io!.emit('custom-event', data);
            });

            // Handle disconnection
            socket.on('disconnect', () => {
                console.log('A user disconnected');
            });
        });


    });
    return server.live();
};

// export default startServer()

export const MainServer = {
    httpServer: startServer(),
    ioServerOptions: {
        cors: {
            origin: config.frontendAppUrl,
            credentials: true
        }
    } as Partial<ServerOptions>
};