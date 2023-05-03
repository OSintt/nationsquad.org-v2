import '../styles/css/home.css';
import { BsDiscord } from 'react-icons/bs';
import Badge from '@mui/material/Badge';

export const Home = () => {
    return (
        <>
            <div className="home-container flex">
                <div className="main-wrapper">
                    <div className='home-items-wrapper'>
                        <div className='home-items flex'>
                            <div>
                                <div className="home-titles">
                                    <h1>
                                        NationSquad
                                    </h1>
                                    <p>Repositorio de doxs en español</p>
                                </div>
                                <div className="home-links">
                                    <div className="discord-button" onClick={() => {
                                        window.open("/bot", "__blank");
                                    }}>
                                        Get Raikiri
                                    </div>
                                    <div className="bot-button" onClick={() => {
                                        window.open("/invite", "__blank");
                                    }}>
                                        <BsDiscord /><span>Join Discord</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}