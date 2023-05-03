import '../styles/css/post.css';
import { Tags } from './Tags';
import { toast } from 'react-hot-toast';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { PostTitle } from './PostTitle';
import axios from 'axios';
import { config } from '../../config';
import { useNavigate } from "react-router-dom";
import { ReactComponent as Loading } from '../assets/loading.svg';
import { Link } from 'react-router-dom';
import { PostTextareas } from './PostTextareas';
axios.defaults.withCredentials = true

export const Post = () => {
    let navigate = useNavigate();
    const [content, setContent] = useState([]);
    const [title, setTitle] = useState([]);
    const [description, setDescription] = useState([]);
    const [tagsForm, setTagsForm] = useState([]);
    const [tags, setTags] = useState([]);
    const [token, setToken] = useState(null);
    const [checked, setChecked] = useState(false);
    const [sending, setSending] = useState(false);
    const { user } = useContext(UserContext);

    const handleSubmit = async () => {
        try {
            setSending(true);
            if (!checked) {
                setSending(false);
                return toast.error((t) => (
                    <span>
                        Por favor, lee nuestros lineamientos <Link style={{ color: '#a6a6a6', textDecoration: 'underline' }} to='/tos'>aquí</Link>
                    </span>
                ));
            }
            const { data } = await axios({
                url: `${config.DOMAIN}/dox/post-dox`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    title,
                    content,
                    description,
                    tags,
                    token
                }
            });
            setSending(false);
            navigate('/dox')
            toast.success(data.message);
        } catch (e) {
            setSending(false);
            toast.error(e.response.data.message);
        }
    }
    const handleWrite = (e, funct) => {
        if (funct === setTagsForm) {
            e.target.value = e.target.value.replace(/[^a-zA-Z\- ]/g, "").replace(' ', '-').trim().toLowerCase();
        }
        funct(e.target.value);
    }

    const handleSubmitTag = e => {
        e.preventDefault();
        if (tags.length >= 5) return toast.error('Solo puedes agregar 5 tags a tu dox! Elimina uno para continuar')
        if (tagsForm.length <= 0) return toast.error('No intentes agregar un tag vacío!');
        if (tags.includes(tagsForm)) return toast.error(`Ya has agregado el tag "${tagsForm}" a tu dox!`)
        const tagsCopy = [...tags];
        tagsCopy.push(tagsForm);
        setTags(tagsCopy);
        setTagsForm('');
    }
    const deleteTag = (id) => {
        const tagsCopy = [...tags];
        for (let i = 0; i < tagsCopy.length; i++) {
            if (tagsCopy[i] === id) {
                tagsCopy.splice(i, 1);
            }
        }
        setTags(tagsCopy);
    }

    return (
        <div className="post-container">
            <h1>Publicar dox</h1>
            <div className="post-box flex">
                <div>
                    <PostTitle write={handleWrite} user={user} funct={setTitle} />
                    <PostTextareas
                        description={description}
                        handleWrite={handleWrite}
                        setDescription={setDescription}
                        setContent={setContent}
                        content={content}
                    />
                    <Tags
                        tags={tags}
                        handleWrite={handleWrite}
                        value={tagsForm}
                        submit={handleSubmitTag}
                        submitForm={handleSubmit}
                        funct={setTagsForm}
                        del={deleteTag}
                        sending={sending}
                        setToken={setToken}
                        checked={checked}
                        setChecked={setChecked}
                    />
                </div>
            </div>
        </div >
    )
    return <Loading className="load-more" />
}