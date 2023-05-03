import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import ListSubheader from '@mui/material/ListSubheader';
import { Badge } from '@mui/material';
import logo from '../assets/logo.jpg';
import { FiLogIn, FiLogOut, FiUser, FiShoppingCart, FiFilePlus } from 'react-icons/fi';
import { BiBot } from 'react-icons/bi';
import { GiFiles } from 'react-icons/gi';
import { FaBars } from 'react-icons/fa';


const NavItem = ({ text, icon, userId }) => (
    <Link to={userId ? `/profile/${userId}` : text.toLowerCase()}>
        <ListItem sx={{ px: 3, pt: 2.5 }} button>
            <ListItemIcon sx={{ color: '#fff' }}>
                {icon}
            </ListItemIcon>
            <ListItemText 
                sx={{ fontWeight: 600 }} 
                primary={text === 'Shop' ? <Badge badgeContent='SOON' color="error">{text}</Badge> : text} 
            />
        </ListItem>
    </Link>

)


export function TemporaryDrawer({ user }) {
    const [display, setDisplay] = React.useState(false);

    const toggleDrawer = (boolean) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setDisplay(boolean);
    };

    const list = () => (
        <Box

            sx={{
                backgroundColor: '#000',
                color: '#fff',
                fontFamily: "'Montserrat', sans-serif",
                textTransform: 'uppercase',
                height: '100%',
                width: 200
            }}
            role="presentation"
            onClick={toggleDrawer(true)}
            onKeyDown={toggleDrawer(false)}
        >
            <List sx={{ color: '#fff' }}>
                <ListSubheader
                    sx={{
                        textTransform: 'uppercase',
                        fontFamily: "'Montserrat', sans-serif",
                        backgroundColor: '#000',
                        color: '#fff',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'start',
                        img: {
                            height: '50px',
                            borderRadius: '50%'
                        }
                    }}
                >
                    <Link to="/">
                        <img src={logo} alt="NationSquad Logo" />
                    </Link><span>NationSquad</span> 
                </ListSubheader>
                <NavItem icon={<GiFiles />} text='Dox' />
                <NavItem icon={<FiFilePlus />} text='Post' />
                <NavItem icon={<BiBot />} text='Bot' />
                <NavItem icon={<FiShoppingCart />} text='Shop' />
            </List>
            <Divider />
            <List>
                {
                    !user.auth ?
                        <NavItem icon={<FiLogIn />} text='Login' /> :
                        <>
                            <NavItem icon={<FiUser/>} userId={user.user.userId} text='Profile' />
                            <NavItem icon={<FiLogOut />} text='Logout' />
                        </>
                }

            </List>
        </Box>
    );

    return (
        <div>
            {
                <>
                    <div className="nav-bars" onClick={toggleDrawer(true)}><FaBars></FaBars></div>
                    <Drawer
                        anchor={'right'}
                        open={display}
                        onClose={toggleDrawer(false)}
                    >
                        {list()}
                    </Drawer>
                </>
            }
        </div>
    );
}