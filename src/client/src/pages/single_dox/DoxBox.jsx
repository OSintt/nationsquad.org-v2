import ReactMarkdown from 'react-markdown';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { FaRegCopy } from 'react-icons/fa';
import { FiAlertCircle } from 'react-icons/fi';
import { DoxAction } from './DoxAction';
import { toast } from 'react-hot-toast';
import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import { config } from '../../config';
import remarkGfm from 'remark-gfm'

const customRender = { a: props => <a href={props.href} target="_blank">{props.children}</a> }

export const DoxBox = ({ dox }) => {
    const { addLikedDox, removeLikedDox, user } = useContext(UserContext);
    const initialState = user.auth ? user.user.liked_doxes.includes(dox.dox._id) : false;
    const [liked, setLiked] = useState(initialState);
    async function like() {
        try {
            const res = await axios.get(`${config.DOMAIN}/dox/like/${dox.dox._id}`, {
                withCredentials: true
            });
            setLiked(res.data.liked);
            let msg = res.data.liked ? 'Le has dado like a un dox!' : 'Le has quitado tu like a un dox!'
            toast.success(msg, {
                style: {
                    color: '#fff',
                    backgroundColor: '#333'
                }
            });
            if (res.data.liked) {
                addLikedDox(res.data.doxes._id);
            } else {
                removeLikedDox(res.data.doxes._id);
            }
        } catch (e) {
            toast.error(e.response.data.message);
        }
    }
    return (
        <div className="single-dox-box">
            <div className="single-dox-techs flex">
                <div className="single-dox-size">
                    <span>size: {dox.filesize}</span>
                </div>
                <div className="single-dox-tags">
                    {
                        dox.dox.tags.map(tag => (
                            <div className="single-dox-tag">#{tag}</div>
                        ))
                    }
                </div>
            </div>
            <div className="single-dox-content">
                <ReactMarkdown components={customRender} remarkPlugins={[remarkGfm]}>
                    {dox.dox.content}
                </ReactMarkdown>
            </div>

            <div className="single-dox-actions flex">
                <DoxAction
                    text={liked ? 'Dislike' : 'Like'}
                    icon={liked ? <AiFillLike /> : <AiOutlineLike />}
                    funct={like}
                />
                <DoxAction
                    text="Copy to clipboard"
                    icon={<FaRegCopy />}
                    funct={() => {
                        try {
                            navigator.clipboard.writeText(dox.dox.content);
                            toast.success('Texto copiado exitosamente!');
                        } catch (e) {
                            toast.error('Ocurrió un error copiando el texto!');
                        }
                    }}
                />
                <DoxAction
                    text="Report"
                    icon={<FiAlertCircle />}
                    funct={() => toast.success('Dox reportado exitosamente')}
                />
            </div>
        </div>
    )
}