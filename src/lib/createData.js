import { faker } from '@faker-js/faker';
import Dox from '../models/Dox';
import { Types } from 'mongoose';
import User from '../models/User';
import Badge from '../models/Badges';

export async function createData(int) {
    for (let i = 0; i < int; i++) {
        let tags = [];
        for (let x = 0; x < Math.random(5, 1); x++) {
            tags.push(faker.hacker.adjective());
        }
        let star = (Math.floor(Math.random() * (3 - 1)) + 1) === 1;
        const newDox = new Dox({
            title: faker.name.findName() + ' dox',
            description: faker.hacker.phrase(),
            content: faker.hacker.phrase(),
            date: new Date(),
            author: Types.ObjectId("6223d92e6887fa9b918b4377"),
            star,
            tags
        });
        await newDox.save();
        console.log(newDox);
    }
}

export async function deleteData() {
    await Dox.deleteMany();
    console.log('Datos eliminados');
}

export async function updateUsers() {
    const users = await User.find();
    for (let user of users) {
        if (!user.nick) {
            user.nick = user.username;
            await user.save();
            console.log(user);
        }
    }
}

export async function createBadges() {
    const badgesInfo = [
        {
            name: 'Lammer',
            description: 'Lammer Oficial de NationSquad',
            logo: '🧟',
        },
        {
            name: 'Chili',
            description: 'Developer Oficial de NationSquad',
            logo: '🐼',
        },
        {
            name: 'd4.',
            description: 'd4.',
            logo: '✨',
        },
        {
            name: 'Edeish',
            description: 'Fundador Oficial de NationSquad',
            logo: '🇨🇱',
        },
        {
            name: 'Admininistrador de NationSquad',
            description: 'Administrador Verificado de NationSquad',
            logo: '👑',
        },
        {
            name: 'Moderador de NationSquad',
            description: 'Moderador Verificado de NationSquad',
            logo: '🦸‍♀️',
        },
        {
            name: 'VIP',
            description: 'Un nazi mal',
            logo: '🦇'
        },
        {
            name: 'Hacker',
            description: 'Este usuario tiene más de 50 doxes publicados',
            logo: '💀',
        },
        {
            name: 'Gurú',
            description: 'Este usuario tiene más de 30 doxes publicados',
            logo: '☠️',
        },
        {
            name: 'Huesito',
            description: 'Este usuario tiene más de 20 doxes publicados',
            logo: '🦴',
        }, 
        {
            name: 'Doxer',
            description: 'Este usuario tiene más de 10 doxes publicados',
            logo: '👻',
        },
        {
            name: 'Rookie',
            description: 'Este usuario tiene más de 5 doxes publicados',
            logo: '🐀',
        }
    ];

    badgesInfo.forEach(async ({ name, description, logo }, index) => {
        try {
            const newBadge = new Badge({
                name,
                description,
                logo, 
                index
            });
            await newBadge.save();
            console.log(newBadge);
        } catch(e) {
            console.log(e);
        }
    });
}