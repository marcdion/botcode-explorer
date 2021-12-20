import { NextPage } from 'next';
import { useState } from 'react';
import { FaAngleRight } from 'react-icons/fa';
import classNames from "classnames";

import DirectoryItem from './DirectoryItem';

type Props = {
    folder: DirectoryItem
}

const Folder: NextPage<Props> = ({folder}) => {
    const [active, setActive] = useState(false);
    const changeActiveState = () => {
        setActive(!active);
    }

    return (
        <div className={classNames('folder', {open: active, closed: !active})}>
            <span className='folder-name' onClick={changeActiveState}>
                <span className='icon'><FaAngleRight className={classNames({open: active})} /></span> 
                <span className='name'>{folder.name}</span>
            </span>

            <ul className={classNames({empty: folder.children.length === 0})}>
                {folder.children.map((child: DirectoryItem) => {
                    return <DirectoryItem key={child.name} directory={child} />
                })}
            </ul>
        </div>
    )
}

export default Folder