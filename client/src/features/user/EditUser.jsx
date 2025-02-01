import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editUserInfo, editUserPassword, uploadProfilePicture } from "./state/slice";

const EditUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state => state.user.user);
    const editInfoStatus = useSelector(state => state.user.editInfoStatus);
    const editPasswordStatus = useSelector(state => state.user.editPasswordStatus);
    const editPictureStatus = useSelector(state => state.user.editPictureStatus);

    console.log(user);
    // console.log(editInfoStatus);
    // console.log(editPasswordStatus);
    // console.log(editPictureStatus);

    const [editInfo, setEditInfo] = useState(false);
    const [editPassword, setEditPassword] = useState(false);
    const [logout, setLogout] = useState(false);
    const [deleteAccount, setDeleteAccount] = useState(false);

    const handleClickEditInfo = () => {};

    const handleClickEditPassword = () => {};

    const handleClickLogout = () => {};
    
    const handleClickDelete = () => {};


    return (
        <>
            <h2>Edit User</h2>
        </>
    );
}
 
export default EditUser;