import express  from 'express';
import http     from 'http';

import store from '../data/store';

let _io: any;

const sockets = {
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

    _getIO: function() {
        return _io;
    }
}

export default sockets;