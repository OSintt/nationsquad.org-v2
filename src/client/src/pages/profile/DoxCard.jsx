import { AiOutlineStar, AiOutlineLike, AiFillLike, AiFillStar } from "react-icons/ai"
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import '../styles/css/profile.css';
import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import { config } from '../../config';
import { Toaster, toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { DefaultTooltip } from '../defaultTooltip';
import { Icons } from '../lib/Icons';
import { BsEye } from 'react-icons/bs';

dayjs.extend(relativeTime)
export const DoxCard = ({ dox }) => {
    const { user, addLikedDox, removeLikedDox } = useContext(UserContext);
    const initialState = user.auth ? user.user.liked_doxes.includes(dox._id) : false;
    const [liked, setLiked] = useState(initialState);

    async function like() {
        try {
            const res = await axios.get(`${config.DOMAIN}/dox/like/${dox._id}`, {
                withCredentials: true
            });
            setLiked(res.data.liked);
            let msg = res.data.liked ? 'Le has dado like a un dox!' : 'Le has quitado tu like a un dox!'
            toast.success(msg, {
                style: {
                    color: '#fff',
                    backgroundColor: '#333'
                }
            });
            if (res.data.liked) {
                addLikedDox(res.data.doxes._id);
            } else {
                removeLikedDox(res.data.doxes._id);
            }
        } catch (e) {
            toast.error(e.response.data.message);
        }
    }
    return (

        <div className="dox-card">
            <div className="dox-icon">
                <Icons
                    icon={dox.star ? <AiFillStar /> : <AiOutlineStar />}
                    title={dox.star ? 'Verified' : 'Unverified'}
                />

            </div>
            <div
                className="dox-icon"
                onClick={like}
            >
                <Icons
                    icon={liked ? <AiFillLike /> : <AiOutlineLike />}
                    title={liked ? 'Dislike' : 'Like'}
                    placement={'bottom'}
                />
            </div>
            <div>
                <Link to={"/dox/" + dox._id}>
                    {dox.title}
                </Link>
            </div>
            <div className="info dox-profile-author">
                {
                    dox.author ?
                        <Link to={"/profile/" + dox.author.userId}>
                            {dox.author.nick}
                        </Link> :
                        <div className="span">@Anon</div>
                }

            </div>
            <div className="info dox-profile-date">{dayjs(dox.date).fromNow()}</div>
            <div className="info flex">
                <DefaultTooltip title={dox.views + ' views'}>
                    <div className="flex"> 
                        <span className="views">{dox.views}</span> <BsEye />
                    </div>
                </DefaultTooltip>
            </div>

        </div>

    )
}