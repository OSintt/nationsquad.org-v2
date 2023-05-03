import { DoxAction } from '../../single_dox/DoxAction';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from "dayjs";
import { Link } from "react-router-dom";

export const DoxTitles = ({ deletion, dox, user, triggerDelete }) => (
    <div className="dox-table-avatar flex">
        <div>
            <Link to={`/dox/${dox._id}`}>
                <span className="dox-table-title">
                    {dox.title.length > 25 ? dox.title.slice(0, 25) + '...' : dox.title}
                </span>
            </Link>
            <span className="muted">・</span>
            <span className="dox-date muted">{dayjs(dox.date).format('D MMM YYYY')}</span>
        </div>
        {
            !deletion && user.auth && (user.user.mod || dox.author && user.user._id === dox.author._id) ?
                <DoxAction
                    icon={<DeleteIcon />}
                    text='Eliminar dox'
                    funct={triggerDelete}
                /> : null
        }
    </div>
)