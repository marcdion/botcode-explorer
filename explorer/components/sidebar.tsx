import { NextPage } from 'next';
import { useState, useEffect } from 'react';

const { io } = require('socket.io-client');
const ENDPOINT = 'http://localhost:3000';

const SideBar: NextPage = () => {
    const [response, setResponse] = useState();
    useEffect(() => {
        const socket = io(ENDPOINT);
        socket.on('update', (data: any) => {
            setResponse(data);
        });

        return () => {
            socket.disconnect()
        }
    
      }, []);

    return (
        <div className='side-bar'>
            
        </div>
    )
}

export default SideBar