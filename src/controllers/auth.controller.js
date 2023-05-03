import User from '../models/User';
import { addBadge } from '../lib/addBadge';

const redirect = process.env.NODE_ENV === 'production' ? process.env.DOMAIN : process.env.DOMAIN2;

const login = async (req, res) => {
    res.redirect(redirect);
}

const logout = async (req, res) => {
    req.logout();
    res.redirect(redirect);
}

const ban = async (req, res) => {
    const { id } = req.params;
    const { user } = req;
    if (!user.admin && !user.mod) return res.status(403).json({ status: 403, message: 'raja de acá wachin' });
    const userToBan = await User.findOne({ userId: id }).populate('badges');
    if (!userToBan) return res.status(404).json({ status: 404, message: 'Ese usuario se lo comió nsnt' });
    const first = userToBan.admin;
    const sec = userToBan.mod && !user.admin;
    if (first || sec) return res.status(403).json({ status: 403, message: 'intentas banear a alguien de tu rango o superior' });
    const { badge } = await addBadge(!userToBan.ban, userToBan, 'Lammer');
    userToBan.ban = !userToBan.ban;
    await userToBan.save();
    return res.status(201).json({ status: 201, badge, banned: userToBan.ban, user: userToBan });
}

const makeMod = async (req, res) => {
    const { id } = req.params;
    const user = await User.findOne({ userId: id }).populate('badges');
    if (!user) return res.status(404).json({ status: 404, message: 'Ese usuario se lo comió nsnt' });
    if (user.admin && user.mod) return res.status(403).json({ status: 403, message: 'No puedes remover los permisos de este usuario' });
    const { badge } = await addBadge(!user.mod, user, 'Moderador de NationSquad');
    user.mod = !user.mod;
    await user.save();
    return res.status(201).json({ status: 201, badge, mod: user.mod, user });
}

const makeVip = async (req, res) => {
    const { id } = req.params;
    const user = await User.findOne({ userId: id }).populate('badges');
    if (!user) return res.status(404).json({ status: 404, message: 'Ese usuario se lo comió nsnt' });
    let vip = user.badges.some(badge => badge.name === 'VIP');
    if (user.admin && vip) return res.status(403).json({ status: 403, message: 'No puedes remover el VIP de este usuario' });
    const { badge } = await addBadge(!vip, user, 'VIP');
    vip = !vip;
    await user.save();
    return res.status(201).json({ status: 201, badge, vip, user });
}

const me = async (req, res) => {
    req.user = await req.user.populate({ path: 'badges', options: { sort: { index: 1 } } });
    return res.status(200).json({ status: 200, user: req.user });
}

const getUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findOne({ userId: id }).select('-liked_doxes')
        .populate({
            path: 'doxes',
            match: { deleted: false },
            options: {
                sort: { date: -1 },
                select: '-content'
            }
        })
        .populate({
            path: 'badges',
            options: {
                sort: { index: 1 }
            }
        });
    if (!user) return res.status(404).json({ status: 404, message: 'Ese usuario se lo comió nsnt' });
    return res.status(200).json({ status: 200, user });
}

const editNick = async (req, res) => {
    let { new_nick } = req.body;
    if (!new_nick) return res.status(409).json({ status: 409, message: 'No puedes tener un nick tan corto' });
    if (typeof new_nick !== 'string') return res.status(400).json({ status: 400, message: 'Tipo de parámetro inválido' });
    new_nick = new_nick.trim();
    if (new_nick.length <= 1) return res.status(409).json({ status: 409, message: 'No puedes tener un nick tan corto' });
    if (new_nick.length > 32) return res.status(409).json({ status: 409, message: 'No puedes tener un nick tan largo' });

    const user = await User.findOneAndUpdate({ userId: req.user.userId }, {
        nick: new_nick
    });

    if (!user) return res.status(403).json({ status: 403, message: 'Necesitas estar registrado para realizar esta acción' });
    await user.save();
    return res.status(201).json({ status: 201, new_nick });
}

const editBio = async (req, res) => {
    let { new_bio } = req.body;
    if (new_bio) {
        if (typeof new_bio !== 'string') return res.status(400).json({ status: 400, message: 'Tipo de parámetro inválido' });
        new_bio = new_bio.trim();
        if (new_bio.length > 128) return res.status(409).json({ status: 409, message: 'No puedes tener una biografía tan larga' });
    } else {
        new_bio = null;
    }
    const user = await User.findOneAndUpdate({ userId: req.user.userId }, {
        bio: new_bio
    });
    if (!user) return res.status(403).json({ status: 403, message: 'Necesitas estar registrado para realizar esta acción' });
    await user.save();
    return res.status(201).json({ status: 201, new_bio });
}

module.exports = {
    ban,
    makeMod,
    makeVip,
    me,
    getUser,
    logout,
    editBio,
    editNick,
    login
}