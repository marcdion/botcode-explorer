import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import DirectoryItem from './DirectoryItem';

const { io } = require('socket.io-client');
const ENDPOINT = 'http://localhost:3000';

const SideBar: NextPage = () => {
    function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
        return value !== null && value !== undefined;
    }

    const [response, setResponse] = useState([]);
    useEffect(() => {
        try {
            const socket = io(ENDPOINT);
            socket.on('update', (data: any) => {
                const filteredArray = data.filter(notEmpty);
                setResponse(filteredArray);
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