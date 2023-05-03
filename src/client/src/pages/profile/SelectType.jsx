import { AiFillHeart } from 'react-icons/ai';
import { RiPlayListAddLine } from 'react-icons/ri';
export const Select = ({isMe, type, setType}) => {

    return (
        <div className="select-container">
            <div 
                className={type === 'mine' ? 'select selected' : "select"}
                onClick={() => setType('mine')}
            >
                <RiPlayListAddLine />
                <span>
                    {isMe ? "My doxes" : "Doxes publicados"}
                </span> 
            </div>
            {
                isMe ?             
                <div 
                    className={type === 'fav' ? 'select selected' : "select"}
                    onClick={() => setType('fav')}
                > 
                <AiFillHeart /> 
                <span>
                    Favorite
                </span> 
            </div> : ''
            }

        </div>
    )
}