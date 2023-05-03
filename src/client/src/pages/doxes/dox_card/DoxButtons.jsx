import { BsEye } from 'react-icons/bs';
import { Icons } from "../../lib/Icons";
import { AiOutlineStar, AiOutlineLike, AiFillLike, AiFillStar } from "react-icons/ai"

export const DoxButtons = ({deletion, star, like, dox, likes, liked}) => (
    <div className="dox-table-buttons flex">
        <div className="dox-table-icon" onClick={!deletion ? star : null}>
            <Icons
                icon={dox.star ? <AiFillStar /> : <AiOutlineStar />}
                title={dox.star ? 'Verified' : 'Unverified'}
                placement={'bottom'}
            />
        </div>
        <div className="dox-table-icon" onClick={!deletion ? like : null}>
            {likes}
            <Icons
                icon={liked ? <AiFillLike /> : <AiOutlineLike />}
                title={liked ? 'Dislike' : 'Like'}
                placement={'bottom'}
            />
        </div>
        <div className="dox-table-icon">
            {dox.views} <Icons icon={<BsEye />} title={dox.views + ' views'} placement={'bottom'} />
        </div>
    </div>
)
