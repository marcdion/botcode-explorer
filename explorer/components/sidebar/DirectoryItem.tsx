import { NextPage } from 'next';

import Folder from './Folder';
import File from './File';

type Props = {
    directory: DirectoryItem
}

const DirectoryItem: NextPage<Props> = ({directory}) => {
    if(directory.type === 'directory') {
        return (
            <Folder folder={directory}/>
        )
    }else {
        return (
            <File file={directory}/>
        )
    }
}

export default DirectoryItem