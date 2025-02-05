import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPublicInfo } from "../user/state/slice";

const Preview = () => {
    const { hashId } = useParams();
    const dispatch = useDispatch();

    const publicUser = useSelector(state => state.user.publicUser);
    const publicLinks = useSelector(state => state.user.publicLinks);
    const publicInfoStatus = useSelector(state => state.user.publicInfoStatus);

    useEffect(() => {
        dispatch(getPublicInfo(hashId));
    }, []);

    useEffect(() => {
        console.log(publicUser);
        console.log(publicLinks);
    }, [publicInfoStatus]);

    return (
        <>
            <h2>Preview</h2>
        </>
    );
}
 
export default Preview;