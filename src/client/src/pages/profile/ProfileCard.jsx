import { DefaultTooltip } from "../defaultTooltip";
import { DoxAction } from "../single_dox/DoxAction";
import { BiBandAid } from 'react-icons/bi';
import { FiEdit } from 'react-icons/fi';
import axios from "axios";
import { toast } from 'react-hot-toast';
import { config } from '../../config';
import { useState, useEffect } from "react";
import { MdAddModerator } from 'react-icons/md';
import { ReactComponent as Loading } from '../assets/loading.svg';
import { UserAvatar } from "../lib/UserAvatar";
import { EditProfile } from "./EditProfile";
import { RiVipCrown2Line } from 'react-icons/ri';

export const ProfileCard = ({ user, me }) => {
    const [isBanned, setBanned] = useState(user.ban);
    const [isMod, setMod] = useState(user.mod);
    const [isVip, setVip] = useState(user.badges.some(badge => badge.name === 'VIP'));
    const [iAm, whoAmI] = useState({ auth: me.auth, user: me.user });
    const [open, setOpen] = useState(false);

    const [nick, setNick] = useState(user.nick);
    const [bio, setBio] = useState(user.bio);

    const [badges, setBadges] = useState(user.badges);

    useEffect(() => {
        setNick(user.nick);
        setBio(user.bio);
        setBadges(user.badges);
    }, [user]);

    function removeBadge(name, boolean, badge) {
        let badgesCopy = [...badges];
        console.log(badgesCopy);
        if (!boolean) {
            badgesCopy.push(badge);
            setBadges(badgesCopy);
        } else {
            for (let i = 0; i < badgesCopy.length; i++) {
                if (badgesCopy[i].name === name) {
                    badgesCopy.splice(i, 1);
                    setBadges(badgesCopy);
                }
            }
        }

    }
    async function ban() {
        let toastLoaded;
        try {
            let msg = isBanned ? 'Desbaneando' : 'Baneando';
            toastLoaded = toast.loading(msg + ' usuario...');
            const { data } = await axios.delete(`${config.DOMAIN}/auth/profile/${user.userId}`);
            removeBadge('Lammer', isBanned, data.badge);
            setBanned(!isBanned);
            msg = data.banned ? 'Usuario baneado con éxito' : 'Usuario desbaneado con éxito';
            toast.dismiss(toastLoaded);
            toast.success(msg);
        } catch (e) {
            toast.dismiss(toastLoaded);
            toast.error(e.response.data.message);
        }
    }

    async function makeMod() {
        let toastLoaded;
        try {
            let msg = isMod ? 'Quitando' : 'Agregando';
            toastLoaded = toast.loading(msg + ' mod...');
            const { data } = await axios.get(`${config.DOMAIN}/auth/make-mod/${user.userId}`);
            removeBadge('Moderador de NationSquad', isMod, data.badge);
            setMod(!isMod);
            msg = data.mod ? 'Mod agregado con éxito' : 'Mod removido con éxito';
            toast.dismiss(toastLoaded);
            toast.success(msg);
        } catch (e) {
            toast.dismiss(toastLoaded);
            toast.error(e.response.data.message);
        }
    }

    async function makeVip() {
        let toastLoaded;
        try {
            let msg = isVip ? 'Quitando' : 'Agregando';
            toastLoaded = toast.loading(msg + ' VIP...');
            const { data } = await axios.get(`${config.DOMAIN}/auth/vip/${user.userId}`);
            removeBadge('VIP', isVip, data.badge);
            setVip(!isVip);
            msg = data.vip ? 'VIP agregado con éxito' : 'VIP removido con éxito';
            toast.dismiss(toastLoaded);
            toast.success(msg);
        } catch (e) {
            toast.dismiss(toastLoaded);
            toast.error(e.response.data.message);
        }       
    }
    const closeEditor = () => setOpen(false);


    if (user)
        return (
            <div className="profile-card flex">
                <div className="profile-avatar">
                    <UserAvatar user={user} />
                </div>
                <div className="profile-info">
                    <div className="profile-username flex">
                        <div className="profile-username-items flex">
                            <div className="profile-username-username">
                                {user.username}
                                <span className="profile-discriminator">#{user.discriminator}</span>
                            </div>

                            <div className="profile-dox-badges flex">
                                {
                                    badges.map(badge => (
                                        <div className="profile-badge" key={badge.index}>
                                            <DefaultTooltip title={badge.name}>
                                                <span onClick={() => toast(badge.name, {
                                                    icon: badge.logo
                                                })}>{badge.logo}</span>
                                            </DefaultTooltip>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="mod-actions flex">
                            {
                                iAm.auth && iAm.user.mod ?
                                    <>
                                        <DoxAction
                                            text={isBanned ? 'Unban user' : 'Ban user'}
                                            icon={<BiBandAid />}
                                            funct={ban}
                                        />
                                        <DoxAction
                                            text={isMod ? 'Remove mod' : 'Add mod'}
                                            icon={<MdAddModerator />}
                                            funct={makeMod}
                                        />
                                        <DoxAction
                                            text={isVip ? 'Remove VIP' : 'Add VIP'}
                                            icon={<RiVipCrown2Line />}
                                            funct={makeVip}
                                        />
                                    </>
                                    : null
                            }
                            {
                                iAm.auth && user.userId === iAm.user.userId ?
                                    <DoxAction
                                        text='Editar perfil'
                                        icon={<FiEdit />}
                                        funct={() => setOpen(true)}
                                    /> : null
                            }
                        </div>

                    </div>
                    <div className="profile-nick">@{nick}</div>
                    <hr />
                    <div className="profile-bio">
                        {bio}
                    </div>
                    {/*<div className="profile-dox-count">
                        {user.doxes.length} doxes publicados
                    </div>*/}
                </div>
                <EditProfile profileBio={setBio} profileNick={setNick} bio={bio} nick={nick} close={closeEditor} trigger={open}></EditProfile>
            </div>
        )
    return <Loading className="load-more"></Loading>
}