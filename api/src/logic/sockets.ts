'use strict'

import http     from 'http';
import store    from '../data/store';

let _io: any;

const sockets = {
    /**
     * Initializes the socket.io instance from http.Server
     * @param {http.Server} server 
     */
    _initIO: function(server: http.Server) {
        _io = require('socket.io')(server, {  
            cors: {
                origin: '*',
            }
        });
        
        _io.on('connection', (socket: any) => {  
            socket.emit('update', store.trees);
        });
    },

    /**
     * Returns the socket.io instance
     * @returns 
     */
    _getIO: function() {
        return _io;
    }
}

export default sockets;