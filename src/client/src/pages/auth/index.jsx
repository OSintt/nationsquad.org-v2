import { useEffect, useContext } from "react";
import axios from 'axios';
import { config } from '../../config';
import { UserContext } from '../../context/UserContext';

export function Auth() {
    const { login } = useContext(UserContext);
    useEffect(() => {
        const getUser = async () => {
          try {
            const res = await axios.get(config.DOMAIN + '/auth/@me', {
              withCredentials: true
            });
            login(res.data.user);
          } catch(e) {
            console.log(e);
          }
        }
        getUser();
    }, []);

    return (
      <></>
    )
}