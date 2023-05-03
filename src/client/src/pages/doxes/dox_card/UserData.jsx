import { DefaultTooltip } from "../../defaultTooltip";
import { Link } from 'react-router-dom';

export const UserData = ({ user }) => {
    const getDescription = () => {
        const today = new Date();
        let timePassed = today - new Date(user.date);
        if (timePassed < 432000) {
            return 'nuevo en nationsquad.org'
        }
        else if (user.badges.length > 0) {
            return user.badges[0].description.toLowerCase();
        } else {
            return user.doxes.length + ' doxes publicados'
        }
    }
    
    return (
        <>
        <DefaultTooltip
            placement={'bottom'} title={getDescription()}
        >
                <img
                    src={`https://cdn.discordapp.com/avatars/${user.userId}/${user.avatar}`}
            alt={user.username + " avatar"}
            onError={
                ({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = 'https://cdn.discordapp.com/embed/avatars/1.png'
                }
            }
        />
        </DefaultTooltip >
        <Link to={`/profile/${user.userId}`}>
            <span className="dox-table-author muted">@{user.nick.length > 17 ? user.nick.slice(0, 17) + '...' : user.nick}</span>
        </Link>
        </>
    )
}