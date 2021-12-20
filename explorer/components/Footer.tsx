import { NextPage } from 'next';
import { FaHeart } from 'react-icons/fa';

const SideBar: NextPage = () => {
    return (
        <footer>Built with<span className='icon'><FaHeart /></span>in Quebec City, by Marc-Antoine Dion</footer>
    )
}

export default SideBar