import { NextPage } from 'next';

type Props = {
    file: {
        name: string,
        path: string,
        type: string,
        extension: string
    }
}

const File: NextPage<Props> = ({file}) => {
    return (
        <div className='file'>
            <p className='file-name'>{file.name}</p>
        </div>
    )
}

export default File