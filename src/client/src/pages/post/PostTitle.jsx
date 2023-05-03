import { Link } from "react-router-dom";
import { UserAvatar } from "../lib/UserAvatar";
import logo from '../assets/logo.jpg';
export const PostTitle = ({ write, funct, user }) => (
    <div className="post-title">
        <label>
            <span>
                Título:
            </span>
            <input
                placeholder="Mi título colorido... 🌸"
                onChange={(e) => write(e, funct)}
                type="text"
            />
        </label>
        <div className="post-author flex">
            {
                user.auth ?
                    <>
                        <Link to={`/profile/${user.user.userId}`}>
                            <span>@{user.user.username}#{user.user.discriminator}</span>
                        </Link>
                        <UserAvatar user={user.user} />
                    </> : 
                    <>
                    <span>@Anónimo</span>
                    <img src={logo} alt="NationSquad logo" />
                    </> 
            }

        </div>
    </div>
)

