import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from 'react';
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { config } from "../../config";
import { Toaster, toast } from "react-hot-toast";
export const Logout = () => {
    const { logout } = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        const logOut = async () => {
            let toastLoaded = toast.loading('Cerrando sesión...');
            logout();
            navigate('/');
            toast.dismiss(toastLoaded);
            toast.success('Sesión cerrada con éxito\nTe esperamos pronto de vuelta!');
            await axios.get(`${config.DOMAIN}/auth/logout`, {
                withCredentials: true
            });
        }
        logOut();
    }, []);
    return <></>
}