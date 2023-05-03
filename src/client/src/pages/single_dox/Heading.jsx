import star from '../assets/star.png';
import { BsEye } from 'react-icons/bs';
import dayjs from 'dayjs';
import { DefaultTooltip } from '../defaultTooltip';
import { Link } from 'react-router-dom';
import { UserAvatar } from "../lib/UserAvatar";
import logo from '../assets/logo.jpg';

const UserData = ({user}) => (
    <Link to={`/profile/${user.userId}`}>
        @{user.username}#{user.discriminator}
    </Link>
)


export const Heading = ({ dox }) => (
    <div className="single-dox-info flex">
        <div className="single-dox-heading flex">
            <div className="single-dox-avatar">
                {
                    dox.author ? <UserAvatar user={dox.author} /> : 
                    <DefaultTooltip title='¡Ahora puedes subir doxs anónimos!'>
                        <img src={logo} alt='NationSquad Logo' />
                    </DefaultTooltip>
                }
                
            </div>
            <div>
                <h2>{dox.title}</h2>
                <div className="single-dox-stats">
                    <span>
                        {
                            dox.author ? <UserData user={dox.author} /> 
                            : '@Anónimo'
                        }
                    </span>
                    <span>
                        {dayjs(dox.date).format('D MMM YYYY')}
                    </span>
                    <span>
                        {dox.views} <BsEye />
                    </span>
                </div>
            </div>
        </div>
        <DefaultTooltip title={dox.star ? 'Verified dox' : 'Unverified dox'}>
            <img src={star} style={dox.star ? null : { filter: 'grayscale(100%)' }} alt="Star Flaticon IMG" />
        </DefaultTooltip>
    </div>
)