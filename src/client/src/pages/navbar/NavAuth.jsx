import { Link } from "react-router-dom";
import { FiLogOut } from 'react-icons/fi';
import { UserAvatar } from "../lib/UserAvatar";
import { TemporaryDrawer } from "./SideBar";

export const NavAuth = ({ user }) => (
    <>
        <TemporaryDrawer user={user}></TemporaryDrawer>
        <div className="nav-auth">
            {
                user.auth ?
                    <>
                        <Link to={'/profile/' + user.user.userId}>
                            <div className="nav-profile">
                                <UserAvatar user={user.user} />
                                <span>{user.user.username + "#" + user.user.discriminator}</span>
                            </div>
                        </Link>

                        <div className="nav-logout">
                            <Link to='/logout'>
                                <FiLogOut />
                            </Link>
                        </div>
                    </> :
                    <div className="nav-button">
                        <Link to="/login">Login with Discord</Link>
                    </div>
            }
        </div>
    </>
)