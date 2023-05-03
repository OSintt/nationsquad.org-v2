import { Link } from "react-router-dom";
import logo from '../assets/logo.jpg';
import Badge from '@mui/material/Badge';
import { toast } from 'react-hot-toast';

export const NavItems = () => (
    <div className="nav-items">
        <div className="nav-brand flex">
            <Link to="/">
                <img src={logo} alt="NationSquad Logo" />
            </Link>
        </div>
        <div className="nav-links">
            <div className="nav-link">
                <Link to="/dox">Doxes</Link>
            </div>
            <div className="nav-link">
                <Link to="/post">
                    Post
                </Link>
            </div>
            <div className="nav-link">
                <Link to="/bot" target="_blank" rel="noopener noreferrer">Bot</Link>
            </div>
            <div className="nav-link" >
                <Badge badgeContent={'soon'} color={'error'}>
                    <Link to="/" onClick={
                        () => toast('Próximamente', {
                            icon: '💀',
                        })
                    }>Shop</Link>
                </Badge>
            </div>
        </div>
    </div >
)