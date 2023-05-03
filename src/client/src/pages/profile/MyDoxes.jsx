import { DoxCard } from "./DoxCard"
import { Error } from "../error";
import { ReactComponent as Loading } from '../assets/loading.svg';
import InfiniteScroll from "react-infinite-scroll-component";
export const MyDoxes = ({ loading, error, doxes, next, nextFunct }) => {

    if (loading) return <Loading className="load-more"/>
    if (error) return <Error code={404} text={'Parece que no hay nada por aquí! Continúa navegando para llenar tu perfil'} />
    return (
        <div className="dox-container">
            {
                <InfiniteScroll
                    dataLength={doxes.length}
                    loader={<Loading className="load-more" />}
                    hasMore={next}
                    next={nextFunct}
                >
                    {
                        doxes.map(dox => (
                            <DoxCard dox={dox} key={dox._id} />
                        ))
                    }
                </InfiniteScroll>
            }
        </div>
    )
    

}