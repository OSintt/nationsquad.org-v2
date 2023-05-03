import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { DefaultTooltip } from '../defaultTooltip';
import SubjectTwoToneIcon from '@mui/icons-material/SubjectTwoTone';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { toast } from 'react-hot-toast';

const customRender = { a: props => <a href={props.href} target="_blank">{props.children}</a> }

const Preview = ({ content }) => (
    <div className="single-dox-content">
        <ReactMarkdown components={customRender} remarkPlugins={[remarkGfm]}>
            {content}
        </ReactMarkdown>
    </div>
)

export const PostTextareas = ({ description, handleWrite, setDescription, setContent, content }) => {
    const [view, setView] = useState('editor');

    const handleSubmit = (event, newView) => {
        if (content.length <= 0) return toast.error('Escribe algo para usar el modo vista previa!');
        if (newView !== null) {
            setView(newView);
        }
    }

    return (
        <>
            <div className="post-description">
                <label>
                    <span>Descripción:</span>
                    <div className="post-textarea">
                        <textarea
                            cols="100"
                            rows="5"
                            placeholder="Mi descripción hacker... 💀"
                            value={description}
                            onChange={(e) => handleWrite(e, setDescription)}
                        >
                        </textarea>
                    </div>
                </label>
            </div>
            <div className="post-content">
                <label>
                    <span>Contenido:</span>
                    <div className="post-textarea post-textarea-content flex">
                        <div className='toggle-form'>
                            <ToggleButtonGroup
                                value={view}
                                exclusive
                                onChange={handleSubmit}
                                aria-label="text alignment"
                                sx={{ backgroundColor: '#333', borderRadius: 0, border: '1px solid #333' }}
                            >
                                <DefaultTooltip title={'Vista de editor'}>
                                    <ToggleButton sx={{ color: '#fff' }} value="editor" aria-label="left aligned">
                                        <SubjectTwoToneIcon sx={{ fontSize: 16 }} />
                                    </ToggleButton>
                                </DefaultTooltip>
                                <DefaultTooltip title={'Preview'}>
                                    <ToggleButton sx={{ color: '#fff' }} value="preview" aria-label="centered">
                                        <VisibilityIcon sx={{ fontSize: 16 }} />
                                    </ToggleButton>
                                </DefaultTooltip>
                            </ToggleButtonGroup>
                        </div>
                        {
                            view === 'editor' ?
                                <textarea
                                    cols="100"
                                    rows="20"
                                    value={content}
                                    placeholder="¿Sabías que puedes usar doble-asteriscos para interectuar con nuestro markdown? ✨..."
                                    onChange={(e) => handleWrite(e, setContent)}
                                ></textarea> : <Preview content={content} />
                        }
                    </div>
                </label>
            </div>
        </>
    )
}
