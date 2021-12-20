import { NextPage } from 'next';

type Props = {
    file: DirectoryItem
}

const File: NextPage<Props> = ({file}) => {
    return (
        <div className='file'>
            <p className='file-name'>{file.name}</p>
        </div>
    )
}

export default File