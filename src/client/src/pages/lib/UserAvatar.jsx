import defPfp from '../assets/def_pfp.png';
import { DefaultTooltip } from '../defaultTooltip';
import dayjs from 'dayjs';

export const UserAvatar = ({ user }) => (
    <DefaultTooltip title={`Miembro desde ${dayjs(user.date).format('D MMM YYYY')}`}>
        <img
            src={`https://cdn.discordapp.com/avatars/${user.userId}/${user.avatar}`}
            alt={user.username + " avatar"}
            onError={
                ({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = defPfp
                }
            }
        />
    </DefaultTooltip>
)                