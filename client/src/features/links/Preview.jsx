import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPublicInfo } from "../user/state/slice";

const Preview = () => {
    const { hashId } = useParams();
    const dispatch = useDispatch();

    const publicInfo = useSelector(state => state.user.publicInfo);

    useEffect(() => {
        dispatch(getPublicInfo(hashId));
    }, []);

    return (
        <>
            <h2>{hashId}</h2>
        </>
    );
}
 
export default Preview;