import { DefaultTooltip } from '../defaultTooltip';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { ImCross } from 'react-icons/im';
import { IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { useRef } from 'react';
import { config } from '../../config';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const ColorButton = styled(IconButton)(({ theme }) => ({
    color: "#fff",
    backgroundColor: "transparent",
    fontSize: '7px',
    margin: 0,
    padding: '7px',
    '&:hover': {
        backgroundColor: "#222",
    },
}));

const DeleteAction = ({ text, icon, funct }) => (
    <DefaultTooltip title={text}>
        <span onClick={funct}>
            <ColorButton aria-label={text}>
                {icon}
            </ColorButton>
        </span>
    </DefaultTooltip>

)

export const Tags = ({ tags, funct, submit, handleWrite, value, del, sending, submitForm, setToken, checked, setChecked }) => {
    const captcha = useRef()
    return (
        <div className="post-tags">
            <div className="post-tags-added flex">
                {
                    tags.map((tag, i) => (
                        <div className="tags-added flex" key={i}>
                            <DeleteAction
                                icon={<ImCross />}
                                text='Delete tag'
                                funct={() => del(tag)}
                            />
                            <span>#{tag}</span>
                        </div>
                    ))
                }

            </div>
            <div className="post-tags-edit flex">
                <label>
                    <span>Agrega tags a tu dox!</span>
                    <div className='flex'>
                        <form onSubmit={submit}>
                            <div className="tags-input flex">
                                <input
                                    value={value}
                                    type="text"
                                    placeholder="[some-tags]... 💕"
                                    onChange={(e) => handleWrite(e, funct)}
                                />
                                <div className="flex add-icon">
                                    <DefaultTooltip title="Add tag">
                                        <button type='submit'>
                                            <IoMdAddCircleOutline />
                                        </button>
                                    </DefaultTooltip>
                                </div>
                            </div>
                        </form>

                    </div>
                </label>
                {
                    sending ?
                        <LoadingButton
                            style={{ fontFamily: "'Montserrat', sans-serif", border: "3px solid", fontWeight: 600 }}
                            loading
                            loadingPosition="start"
                            startIcon={<SaveIcon />}
                            variant="outlined"
                            color="error"
                        >
                            Save
                        </LoadingButton> :
                        <Button
                            style={{ fontFamily: "'Montserrat', sans-serif", border: "3px solid", fontWeight: 600 }}
                            onClick={submitForm}
                            color="error"
                            variant='outlined'
                            endIcon={<SendIcon />}
                        >
                            Post
                        </Button>
                }

            </div>
            <div className="hcaptcha-form">
                <FormGroup sx={{margin: '1em 0'}}>
                    <FormControlLabel control={<Checkbox
                        color='error'
                        checked={checked}
                        onChange={() => setChecked(!checked)}
                    />} label='He leído los terminos y condiciones de nation-squad.ga' />
                </FormGroup>

                <HCaptcha
                    theme='dark'
                    sitekey={config.HCAPTCHA_KEY}
                    onVerify={token => setToken(token)}
                    onExpire={e => setToken('')}
                    ref={captcha}
                />
            </div>
        </div>
    )
}