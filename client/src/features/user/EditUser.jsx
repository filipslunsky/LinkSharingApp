import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editUserInfo, editUserPassword, uploadProfilePicture, deleteUser, logoutUser } from "./state/slice";

const EditUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state => state.user.user);
    const editInfoStatus = useSelector(state => state.user.editInfoStatus);
    const editPasswordStatus = useSelector(state => state.user.editPasswordStatus);
    const editPictureStatus = useSelector(state => state.user.editPictureStatus);

    console.log(user);

    const [editPassword, setEditPassword] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [profilePicture, setProfilePicture] = useState(null);
    const [logout, setLogout] = useState(false);
    const [deleteAccount, setDeleteAccount] = useState(false);

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const publicEmailRef = useRef();
    const oldPasswordRef = useRef();
    const newPasswordRef = useRef();
    const newPasswordConfirmRef = useRef();

    const checkPasswords = () => {
        const newPassword = newPasswordRef.current.value;
        const newPasswordConfirm = newPasswordConfirmRef.current.value;

        if (newPassword === newPasswordConfirm) {
            setPasswordMatch(true);
        } else {
            setPasswordMatch(false);
        };
    };

    const handleEditPassword = () => {
        const oldPassword = oldPasswordRef.current.value;
        const newPassword = newPasswordRef.current.value;
        if (oldPassword === '' || newPassword === 0 || !passwordMatch) return;
        const email = user.email;
        dispatch(editUserPassword({oldPassword, newPassword, email}));
        setEditPassword(false);
    };

    const handleSave = () => {
        const firstName = firstNameRef.current.value;
        const lastName = lastNameRef.current.value;
        const publicEmail = publicEmailRef.current.value;
        const email = user.email;

        if (firstName === '' || lastName === ''|| publicEmail === '') return;
        dispatch(editUserInfo({firstName, lastName, email, publicEmail}));

        if (profilePicture) {
            const formData = new FormData();
            formData.append('profile_picture', profilePicture);
            formData.append('email', user.email);

            dispatch(uploadProfilePicture(formData));
        }
    };

    const handleLogout = () => {};
    
    const handleDelete = () => {};

    return (
        <>
            <div className="editUserMainContainer">
                <div className="editUserHeaderContainer">
                    <h2 className="editUserHeader">Profile Details</h2>
                    <p className="editUserDescription">Add your user details to create a personal touch to your profile.</p>
                </div>
                <div className="editUserEditPictureContainer">
                    <span className="editUserEditPictureLable">Profile picture</span>
                    <input type="file" className="editUserEditPictureInput" onChange={(e) => setProfilePicture(e.target.files[0])} />
                    <span className="editUserEditPictureDescription"></span>
                </div>
                <div className="editUserEditInfoContainer">
                    <div className="editUserEditInfoItemContainer">
                        <span className="editUserEditInfoItemLable">First name*</span>
                        <input type="text" defaultValue={user.firstName} ref={firstNameRef} className="editUserEditInfoItemInput" />
                    </div>
                    <div className="editUserEditInfoItemContainer">
                        <span className="editUserEditInfoItemLable">Last name*</span>
                        <input type="text" defaultValue={user.lastName} ref={lastNameRef} className="editUserEditInfoItemInput" />
                    </div>
                    <div className="editUserEditInfoItemContainer">
                        <span className="editUserEditInfoItemLable">Email</span>
                        <input type="text" defaultValue={!user.publicEmail ? user.email : user.publicEmail} ref={publicEmailRef} className="editUserEditInfoItemInput" />
                    </div>
                    <div className="userEditPasswordContainer">
                        {!editPassword && <button className="editUserEditPasswordButton" onClick={() => {setEditPassword(true)}}>Change Password</button>}
                        {
                        editPassword
                        &&
                        <div className="userEditPasswordInputsContainer">
                            <div className="editUserEditInfoItemContainer">
                                <span className="editUserEditInfoItemLable">Old password</span>
                                <input className="editUserEditInfoItemInput" type="password" ref={oldPasswordRef} />
                            </div>
                            <div className="editUserEditInfoItemContainer">
                                <span className="editUserEditInfoItemLable">New password</span>
                                <input className="editUserEditInfoItemInput" type="password" ref={newPasswordRef} onChange={checkPasswords} />
                            </div>
                            <div className="editUserEditInfoItemContainer">
                                <span className="editUserEditInfoItemLable">New password confirm</span>
                                <input className="editUserEditInfoItemInput" type="password" ref={newPasswordConfirmRef} onChange={checkPasswords} />
                                {!passwordMatch ? <span className="editUserPasswordWarning">Passwords don't match</span> : <span className="editUserPasswordsCorrect">Passwords match.</span>}
                            </div>
                            <div className="userEditPasswordControlsContainer">
                                <button className="userEditPaswordConfirmButton" onClick={handleEditPassword}>Update</button>
                                <button className="userEditPaswordCancelButton" onClick={() => {setEditPassword(false)}}>Cancel</button>
                            </div>
                        </div>
                        }
                    </div>
                </div>
                <div className="userEditButtonContainer">
                    <button className="userEditSaveButton" onClick={handleSave}>Save</button>
                </div>
            </div>
        </>
    );
}
 
export default EditUser;