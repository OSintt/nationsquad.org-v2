import error from '../assets/error.png';
import '../styles/css/error.css';

export const Error = ({ text, code }) => (
    <div className="error-container">
            <div className='error-title flex'>
                <img src={error} alt="Error NationSquad" />
                <h2 className='flex'>{code ? code : "502"}</h2>
            </div>
        <span>Oh no! <br />{text ? text : 'Ocurrió un error inesperado'}</span>
    </div>
)