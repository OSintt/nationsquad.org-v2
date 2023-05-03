import Badge from '../models/Badges';
import User from '../models/User';

export const addBadge = async (condition, user, badgeName) => {
    const badge = await Badge.findOne({ name: badgeName });
    let gotten = true;
    if (condition) {
        user.badges.push(badge._id)
    } else {
        for (let i = 0; i < user.badges.length; i++) {
            if (String(user.badges[i]._id) === String(badge._id)) {
                user.badges.splice(i, 1);
                gotten = false;
                break;
            }
        }
    }
    await user.save();
    return { badge, gotten };
}

export const addDoxBadge = async (user, condition) => {
    const badges = [
        { name: 'Hacker', int: 50 },
        { name: 'Gurú', int: 30 },
        { name: 'Huesito', int: 20 },
        { name: 'Doxer', int: 10 },
        { name: 'Rookie', int: 5 }
    ];
    user = await user.populate({ path: 'doxes', match: { deleted: false } });
    let badge = null;
    for (let i = 0; i < badges.length; i++) {
        if (condition ? user.doxes.length === badges[i].int : user.doxes.length === badges[i].int - 1) {
            badge = await Badge.findOne({ name: badges[i].name });
            if (condition) {
                user.badges.push(badge);
                break;
            } else {
                for (let x = 0; x < user.badges.length; x++) {
                    if (String(user.badges[x]) === String(badge._id)) {
                        user.badges.splice(x, 1);
                        break;
                    }
                }
                break;
            }
        }
    }
    await user.save();
    return badge;
}

export const modifyBadges = async () => {
    const osint = await User.findOne({userId: '818625837653033050'});
    const badge1 = await Badge.findOne({name: 'Admininistrador de NationSquad'});
    const badge2 = await Badge.findOne({name: 'Moderador de NationSquad'});
    const badge3 = await Badge.findOne({name: 'Rookie'});
    osint.badges = [badge1._id, badge2._id, badge3._id];
    await osint.save();
    console.log('osint guardado!');
} 