import { useContext, useEffect, useState } from "react";
import { ProfileCard } from "./ProfileCard";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { config } from "../../config";
import { Error } from '../error'
import '../styles/css/profile.css'
import { Select } from "./SelectType";
import { UserContext } from "../../context/UserContext";
import { MyDoxes } from "./MyDoxes";
import { toast } from 'react-hot-toast';
import { ReactComponent as Loading } from '../assets/loading.svg';
import { Helmet as MetaTags } from 'react-helmet';

export const Profile = () => {
    const [user, setUser] = useState(null);
    const [doxesType, setType] = useState('mine');
    const [doxes, setDoxes] = useState([]);
    const [isMe, setMe] = useState(false);
    const [error, setError] = useState({ boolean: false, text: '', code: null });
    const [page, setPage] = useState({ int: 1, next: false, prev: false });
    const [doxError, setDoxsError] = useState(false);
    const [doxsLoading, setLoading] = useState(false);
    const { userId } = useParams();
    const contextUser = useContext(UserContext);
    useEffect(() => {
        const getUser = async () => {
            try {
                const { data } = await axios.get(`${config.DOMAIN}/auth/profile/${userId}`);
                setUser(data.user);
                if (contextUser.user.auth && contextUser.user.user.userId === userId) {
                    setMe(true);
                }

            } catch (e) {
                setError({ boolean: true, text: e.response.data.message, code: e.response.data.status });
                toast.error(e.response.data.message);
            }
        }
        getUser();
    }, [userId])

    useEffect(() => {
        const getDoxes = async () => {
            try {
                setLoading(true);
                let domain = doxesType === 'mine' ? `${config.DOMAIN}/dox/from/${userId}/1` : `${config.DOMAIN}/dox/fav/1`
                const { data } = await axios.get(domain, {
                    withCredentials: true
                });
                setLoading(false);
                setDoxsError(false);
                setDoxes(data.doxes);
                setPage({ int: data.page, next: data.next, prev: data.prev });
            } catch (e) {
                setLoading(false);
                setDoxsError(true);
            }
        }
        getDoxes();
    }, [doxesType]);

    const getMoreDoxes = async () => {
        let domain = doxesType === 'mine' ? `${config.DOMAIN}/dox/from/${userId}/${page.int + 1}` : `${config.DOMAIN}/dox/fav/${page.int + 1}`
        const { data } = await axios.get(domain, {
            withCredentials: true
        });
        setPage({ int: data.page, next: data.next, prev: data.prev })
        let doxesCopy = [...doxes].concat(data.doxes);
        setDoxes(doxesCopy);
    }

    if (user)
        return (
            <>
                {
                    error.boolean ? <Error code={error.code} text={error.text} /> :
                        <div className="container-profile">
                            <MetaTags>
                                <title>{user.nick}</title>
                            </MetaTags>
                            <ProfileCard me={contextUser.user} user={user} />
                            <hr />
                            <Select isMe={isMe} type={doxesType} setType={setType} />
                            <MyDoxes loading={doxsLoading} error={doxError} doxes={doxes} next={page.next} nextFunct={getMoreDoxes} />
                        </div>
                }

            </>
        )
    if (error.boolean)
        return <Error code={error.code} text={error.text} />
    return <Loading className="load-more"></Loading>
}