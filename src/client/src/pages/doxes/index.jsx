import { DoxCard } from "./dox_card";
import '../styles/css/doxes.css';
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { config } from "../../config";
import { Search } from "./Buscador";
import { toast, Toaster } from "react-hot-toast";
import { Error } from "../error";
import InfiniteScroll from 'react-infinite-scroll-component';
import { ReactComponent as Loading } from '../assets/loading.svg';
import { UserContext } from "../../context/UserContext";

export const Doxes = () => {
    const { user } = useContext(UserContext);
    const [doxes, setDoxes] = useState([]);
    const [doxes2Render, setDoxes2Render] = useState([]);
    const [error, setError] = useState({ boolean: false, text: '', code: null });
    const [search, triggerSearch] = useState([]);
    const [page, setPage] = useState({ int: 1, next: false, prev: false });
    useEffect(() => {
        const getDoxes = async () => {
            try {
                const { data } = await axios.get(`${config.DOMAIN}/dox/mierda/${page.int}`);
                setDoxes(data.doxes);
                setDoxes2Render(data.doxes);
                setPage({ int: data.page, next: data.next, prev: data.prev })
            } catch (e) {
                setError({ boolean: true, text: e.response.data.message, code: e.response.data.status });
                toast.error(e.response.data.message);
            }
        }
        getDoxes()
    }, []);
    useEffect(() => {
        if (search.length !== 0) {
            setDoxes2Render(search);
        } else {
            setDoxes2Render(doxes);
        }
    }, [search]);

    const getMoreDoxes = async () => {
        const { data } = await axios.get(`${config.DOMAIN}/dox/mierda/${page.int + 1}`);
        const newDoxes = [...doxes2Render].concat(data.doxes);
        setDoxes2Render(newDoxes);
        setPage({ int: data.page, next: data.next, prev: data.prev })
    }
    if (error.boolean)
        return (
            <Error text={error.text} code={error.code} />
        )
    return (
        <div className="doxes-container">
            <h1>Doxes de NationSquad</h1>
            <Search triggerSearch={triggerSearch} />
            <p>Renderizando {doxes2Render.length} resultados</p>
            <div className="container doxes-table">
                {
                    doxes2Render.length !== 0 ? 
                    <InfiniteScroll
                        dataLength={doxes2Render.length}
                        next={getMoreDoxes}
                        hasMore={page.next && search.length === 0}
                        loader={<Loading className="load-more" />}
                    >
                        {
                            doxes2Render.map(dox => (
                                <DoxCard key={dox._id} dox={dox} me={user} doxes={doxes2Render} setDoxes={setDoxes2Render} />
                            ))
                        }
                    </InfiniteScroll> : <Loading className="load-more" />
                }

            </div>
        </div>
    )
}