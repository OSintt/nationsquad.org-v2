import { DefaultTooltip } from "../../defaultTooltip";
import { useContext, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import axios from "axios";
import { toast } from 'react-hot-toast';
import { config } from "../../../config";
import logo from '../../assets/logo.jpg';
import { UserData } from "./UserData";
import { DoxButtons } from "./DoxButtons";
import { DoxPreview } from './DoxPreview';
import { DoxTitles } from "./DoxTitles";
import { DeleteDox } from "./DeleteDox";

export const DoxCard = ({ dox, doxes, setDoxes, deletion }) => {
    const { user, addLikedDox, removeLikedDox } = useContext(UserContext);
    const initialState = user.auth ? user.user.liked_doxes.includes(dox._id) : false;
    const [liked, setLiked] = useState(initialState);
    const [likes, setLikes] = useState(dox.likes);
    const [open, setOpen] = useState(false);

    const closeDelete = () => setOpen(false);

    async function star() {
        let toastLoaded;
        try {
            toastLoaded = toast.loading('Verificando dox...');
            const { data } = await axios.get(`${config.DOMAIN}/dox/star/${dox._id}`, {
                withCredentials: true
            });
            const doxesCopy = [...doxes];
            for (let i = 0; i < doxesCopy.length; i++) {
                if (doxesCopy[i]._id === dox._id) {
                    doxesCopy[i].star = data.starred;
                    setDoxes(doxesCopy);
                }
            }
            let msg = data.starred ? 'Dox verificado' : 'Dox desverificado';
            toast.dismiss(toastLoaded);
            toast.success(msg + ' con éxito!');
        } catch (e) {
            toast.dismiss(toastLoaded);
            toast.error(e.response.data.message);
        }
    }
    async function del() {
        let toastLoaded;
        try {
            toastLoaded = toast.loading('Eliminando dox...');
            await axios.delete(`${config.DOMAIN}/dox/basura/${dox._id}`, {
                withCredentials: true
            });
            const doxesCopy = [...doxes];

            for (let i = 0; i < doxesCopy.length; i++) {
                if (doxesCopy[i]._id === dox._id) {
                    doxesCopy.splice(i, 1);
                    setDoxes(doxesCopy);
                }
            }
            toast.dismiss(toastLoaded);
            toast.success('Dox eliminado con éxito!');
        } catch (e) {
            toast.dismiss(toastLoaded);
            toast.error(e.response.data.message);
        }
    }
    async function like() {
        try {
            const res = await axios.get(`${config.DOMAIN}/dox/like/${dox._id}`, {
                withCredentials: true
            });
            setLiked(res.data.liked);
            let msg = res.data.liked ? 'Le has dado like a un dox!' : 'Le has quitado tu like a un dox!'
            toast.success(msg);
            if (res.data.liked) {
                addLikedDox(res.data.doxes._id);
                setLikes(res.data.doxes.likes);
            } else {
                removeLikedDox(res.data.doxes._id);
                setLikes(res.data.doxes.likes);
            }
        } catch (e) {
            toast.error(e.response.data.message);
        }
    }


    return (
        <div className={`dox-table-card ${!deletion ? 'dox-table-margin' : null}`}>
            <DoxTitles dox={dox} user={user} triggerDelete={() => setOpen(true)} deletion={deletion} />
            <div className="dox-table-info">
                <div className="dox-table-username flex">
                    {
                        dox.author ? <UserData user={dox.author} /> :
                            <>
                                <DefaultTooltip
                                    placement={'bottom'} title='@Anon'
                                >
                                    <img
                                        src={logo}
                                        alt={'NationSquad Logo'}
                                    />
                                </DefaultTooltip>
                                <span className="dox-table-author muted">@Anónimo</span>
                            </>
                    }
                </div>
                <div className="dox-table-stats">
                    <DoxPreview dox={dox} />
                    <DoxButtons 
                        dox={dox} 
                        star={star}
                        like={like}
                        likes={likes}
                        liked={liked}
                        deletion={deletion}
                    />
                </div>
            </div>
            {!deletion ? <hr /> : null}
            <DeleteDox close={closeDelete} dox={dox} trigger={open} del={del} />
        </div>
    )
}