import { createContext, useState } from 'react';

const initialState = {
    user: null,
    auth: false
}
export const UserContext = createContext(initialState);

export const UserProvider = ({children}) => {
    const [user, setUser] = useState({user: null, auth: false});
    const addLikedDox = (dox) => {
        let userCopy = {...user};
        userCopy.user.liked_doxes.push(dox);
        console.log(userCopy);
        setUser(userCopy);
    }

    const removeLikedDox = (dox) => {
        let userCopy = {...user};
        const liked = userCopy.user.liked_doxes;
        const index = liked.find(d => d === dox);
        liked.splice(liked.indexOf(index), 1);
        setUser(userCopy);
    }

    const login = (user) => {
        setUser({
            user,
            auth: true
        })
    }

    const logout = () => {
        setUser({
            user: null,
            auth: false
        })
    }

    return <UserContext.Provider value={{user, login, logout, addLikedDox, removeLikedDox}}>
        {children}
    </UserContext.Provider>
}