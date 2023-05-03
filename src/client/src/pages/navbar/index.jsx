import '../styles/css/navbar.css';
import { useContext} from "react";
import { UserContext } from "../../context/UserContext";

import { NavItems } from "./NavItems";
import { NavAuth } from './NavAuth';
export const Navbar = () => {
    const { user } = useContext(UserContext);
    return (
        <>
            <nav className="flex">
                <NavItems />
                <NavAuth user={user} />         
            </nav>

        </>
    )
}