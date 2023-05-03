import { DoxBox } from './DoxBox';
import '../styles/css/single_dox.css';
import { useEffect } from 'react';
import axios from 'axios';
import { config } from '../../config';
import { useState } from 'react';
import { Error } from '../error';
import { useParams } from 'react-router-dom';
import { ReactComponent as Loading } from '../assets/loading.svg';
import { Heading } from './Heading';

import { Helmet as MetaTags } from 'react-helmet';

export const SingleDox = () => {
    const [dox, setDox] = useState({ dox: null, filesize: null });
    const [error, setError] = useState({ boolean: false, text: '', code: null });
    const { id } = useParams();
    useEffect(() => {
        let isMounted = true;
        const getDox = async () => {
            try {
                const { data } = await axios.get(`${config.DOMAIN}/dox/basura/${id}`);
                setDox({ dox: data.dox, filesize: data.file_size });
            } catch (e) {
                setError({ boolean: true, text: e.response.data.message, code: e.response.data.status });
            }
        }
        if (isMounted) {
            getDox();
        }
        return () => { isMounted = false };
    }, []);

    if (error.boolean) return <Error code={error.code} text={error.text} />
    if (dox.dox) return (
        <>
            <MetaTags>
                <title>{dox.dox.title}</title>
            </MetaTags>
            <div className="single-dox-container">
                <Heading dox={dox.dox} />
                <DoxBox dox={dox} />
            </div>
        </>
    )
    return <Loading className='load-more' />
}