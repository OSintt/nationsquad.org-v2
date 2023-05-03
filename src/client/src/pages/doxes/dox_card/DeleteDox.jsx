import Popup from "reactjs-popup";
import CloseIcon from '@mui/icons-material/Close';
import { DoxCard } from './index';

export const DeleteDox = ({ close, dox, trigger, del }) => (
    <Popup closeOnEscape closeOnDocumentClick open={trigger} onClose={close} position="right center">
        <div className="delete-dox-popup">
            <div className="delete-dox-items">
                <div 
                    onClick={close} 
                    style={{cursor: 'pointer'}} 
                    className="flex delete-dox-close-icon"
                >
                    <CloseIcon />
                </div>
                <div className="delete-dox-titles">
                    <h2>¿Estás seguro de que deseas eliminar este dox?</h2>
                    <DoxCard dox={dox} deletion={true} ></DoxCard>
                </div>
            </div>
            <div className="delete-dox-buttons flex">
                <button className="delete-dox-cancel-button" onClick={close}>
                    Cancelar
                </button>
                <button className="delete-dox-accept-button" onClick={del}>
                    Aceptar
                </button>
            </div>
        </div>
    </Popup>
)