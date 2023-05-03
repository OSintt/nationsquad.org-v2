import axios from "axios";
import { useState } from "react"
import { config } from "../../config";
import { toast } from "react-hot-toast";
export const Search = ({ triggerSearch }) => {
    const [search, setSearch] = useState([]);

    const handleSearch = e => {
        setSearch(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (search.length <= 0) return toast.error('No intentes enviar queries vacías!');
        const getDoxes = async () => {
            let toastLoaded;
            try {
                toastLoaded = toast.loading('Buscando doxes...');
                const res = await axios.get(`${config.DOMAIN}/dox/look-for/${search}`);
                toast.dismiss(toastLoaded);
                triggerSearch(res.data.doxes);
            } catch (e) {
                toast.dismiss(toastLoaded);
                toast.error(e.response.data.message);
            }
        }
        getDoxes();
    }

    return (
        <div className="search-form">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Buscar..."
                    onChange={handleSearch}
                />
                <button type='submit'>Search</button>
            </form>
        </div>
    )
}