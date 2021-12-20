import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import DirectoryItem from './DirectoryItem';

const { io } = require('socket.io-client');
const ENDPOINT = 'http://localhost:3000';

const SideBar: NextPage = () => {
    const [response, setResponse] = useState([]);
    useEffect(() => {
        try {
            const socket = io(ENDPOINT);
            socket.on('update', (data: any) => {
                setResponse(data);
            });

            return () => {
                socket.disconnect()
            }
        } catch(err) {
            console.log(err);
        }
      }, []);

    return (
        <div className='side-bar'>
            <p className='header'>Botcode</p>
        
            <div className='directories'>
                {response.map((directory: DirectoryItem) => {
                    return (
                        <div className='directory' key={directory.name}>
                            <DirectoryItem directory={directory} />
                        </div>
                    )
                })}
            </div>
            
        </div>
    )
}

export default SideBar