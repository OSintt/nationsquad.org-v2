import axios from "axios";
import { useState } from "react"
import Popup from 'reactjs-popup';
import { config } from "../../config";
import { toast } from 'react-hot-toast';
import CloseIcon from '@mui/icons-material/Close';

export const EditProfile = ({ profileBio, profileNick, nick, bio, close, trigger }) => {
    const [newNick, setNick] = useState(nick);
    const [newBio, setBio] = useState(bio);

    const handleSubmit = async e => {
        e.preventDefault();
        let toastLoaded;
        try {
            toastLoaded = toast.loading('Actualizando perfil...');
            if (newNick !== nick || newNick.length === 0) {
                const { data } = await axios(
                    {
                        url: `${config.DOMAIN}/auth/new-nick`,
                        method: 'PUT',
                        data: {
                            new_nick: newNick
                        }
                    }
                );
                profileNick(data.new_nick);
            }
            if (newBio !== bio || newBio.length === 0) {
                const { data } = await axios(
                    {
                        url: `${config.DOMAIN}/auth/new-bio`,
                        method: 'PUT',
                        data: {
                            new_bio: newBio
                        }
                    }
                );
                profileBio(data.new_bio);
            }
            toast.dismiss(toastLoaded);
            toast.success('Tu perfil se ha actualizado con éxito');
            close();
        } catch (e) {
            toast.dismiss(toastLoaded);
            toast.error(e.response.data.message);
        }

    }

    const handleNewBio = (e) => {
        if (e.target.value.length > 128) return;
        setBio(e.target.value);
    }
    const handleNewNick = (e) => {
        if (e.target.value.length > 32) return;
        setNick(e.target.value);
    }
    return (
        <Popup closeOnEscape closeOnDocumentClick open={trigger} onClose={close} position="right center">
            <div className="edit-profile-container">
                <form onSubmit={handleSubmit}>
                    <div className="edit-profile-items">
                        <div 
                            className="edit-profile-close flex" 
                            style={{justifyContent: 'end', cursor: 'pointer'}} 
                            onClick={close}
                        >
                            <CloseIcon />
                        </div>
                        <div className="edit-profile-titles">
                            <h2>Edita tu nombre de usuario y tu biografía</h2>
                            <p>¡Intenta usar conceptos originales que te describan!</p>
                        </div>
                        <div className="edit-profile-forms">
                            <div className="edit-profile-form-group">
                                <label>
                                    Nuevo nick
                                    <div className="edit-profile-input">
                                        <input type="text" value={newNick} onChange={handleNewNick} />
                                    </div>

                                </label>
                            </div>
                            <div className="edit-profile-form-group">
                                <label>
                                    Nueva biografía
                                    <div className="edit-profile-input">
                                        <input value={newBio} onChange={handleNewBio} />
                                    </div>
                                </label>
                            </div>

                        </div>
                    </div>
                    <div className="edit-profile-buttons flex">
                        <button className="edit-profile-cancel-button" onClick={close}>
                            Cancelar
                        </button>
                        <button type="submit" className="edit-profile-accept-button">
                            Aceptar
                        </button>
                    </div>
                </form>
            </div>
        </Popup>

    )
}