import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editUserInfo, editUserPassword, uploadProfilePicture, deleteUser, logoutUser, resetEditInfoStatus, resetEditPictureStatus, resetEditPasswordStatus } from "./state/slice";
import { setStatusMessage } from "../links/state/slice.js";
import StatusMessage from "../links/StatusMessage.jsx";
import MobileView from '../general/MobileView.jsx';
import editPhotoIcon from '../../assets/img/icon-upload-image.svg';
import './editUser.css';

const EditUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const BASE_URL = `${import.meta.env.VITE_API_URL}`;

    const user = useSelector(state => state.user.user);
    const editInfoStatus = useSelector(state => state.user.editInfoStatus);
    const editPasswordStatus = useSelector(state => state.user.editPasswordStatus);
    const editPictureStatus = useSelector(state => state.user.editPictureStatus);
    const statusMessage = useSelector(state => state.links.statusMessage);

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

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/');
    };
    
    const handleDelete = () => {
        const email = user.email;
        dispatch(deleteUser({email}));
        dispatch(logoutUser());
        navigate('/');
    };

    useEffect(()=> {
                if (editInfoStatus === 'success') {
                    dispatch(setStatusMessage({ text: "User information saved successfully!", visible: true, style: 'success' }));
                    setTimeout(() => dispatch(setStatusMessage({ text: "", visible: false, style: '' })), 3000);
                    dispatch(resetEditInfoStatus());
                } else if (editInfoStatus === 'failed') {
                    dispatch(setStatusMessage({ text: "Failed to save user information. Please try again.", visible: true, style: 'failed' }));
                    setTimeout(() => dispatch(setStatusMessage({ text: "", visible: false, style: '' })), 3000);
                    dispatch(resetEditInfoStatus());
                }
            }, [editInfoStatus]);

    useEffect(()=> {
                if (editPasswordStatus === 'success') {
                    dispatch(setStatusMessage({ text: "Password changed successfully!", visible: true, style: 'success' }));
                    setTimeout(() => dispatch(setStatusMessage({ text: "", visible: false, style: '' })), 3000);
                    dispatch(resetEditPasswordStatus());
                } else if (editPasswordStatus === 'failed') {
                    dispatch(setStatusMessage({ text: "Failed to change password. Please try again.", visible: true, style: 'failed' }));
                    setTimeout(() => dispatch(setStatusMessage({ text: "", visible: false, style: '' })), 3000);
                    dispatch(resetEditPasswordStatus());
                }
            }, [editPasswordStatus]);

    useEffect(()=> {
                if (editPictureStatus === 'success') {
                    dispatch(setStatusMessage({ text: "New picture saved successfully!", visible: true, style: 'success' }));
                    setTimeout(() => dispatch(setStatusMessage({ text: "", visible: false, style: '' })), 3000);
                    dispatch(resetEditPictureStatus());
                } else if (editPictureStatus === 'failed') {
                    dispatch(setStatusMessage({ text: "Failed to save new picture. Please try again.", visible: true, style: 'failed' }));
                    setTimeout(() => dispatch(setStatusMessage({ text: "", visible: false, style: '' })), 3000);
                    dispatch(resetEditPictureStatus());
                }
            }, [editPictureStatus]);



    return (
        <>
            {statusMessage.visible && <StatusMessage text={statusMessage.text} style={statusMessage.style} />}
            <div className="editLinksAndUserContainer">
                <MobileView />
                <div className="editUserMainContainer">
                    <div className="editUserHeaderContainer">
                        <h2 className="editUserHeader">Profile Details</h2>
                        <p className="editUserDescription">Add your user details to create a personal touch to your profile.</p>
                    </div>
                    <div className="editUserEditPictureContainer">
                        <span className="editUserEditPictureLable">Profile picture</span>
                        <label className="editUserUploadLabel">
                            <input 
                                type="file" 
                                className="editUserEditPictureInput" 
                                onChange={(e) => setProfilePicture(e.target.files[0])} 
                            />
                            <img src={editPhotoIcon} alt="upload icon" className="editUserUploadIcon" />
                        </label>

                        {user.profilePicture && (
                            <img src={`${BASE_URL}${user.profilePicture}`} alt="profile picture" className="editUserProfilePicture" />
                        )}
                        <span className="editUserEditPictureDescription">
                            Image must be a square below 1024x1024px. Use PNG, JPG, or JPEG format.
                        </span>
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
                                </div>
                                {!passwordMatch ? <span className="editUserPasswordWarning">Passwords don't match</span> : <span className="editUserPasswordsCorrect">Passwords match.</span>}
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
                        {!logout && <button className="editUserLogoutButton" onClick={() => {setLogout(true)}}>Logout</button> }
                        {
                        logout
                        &&
                        <div className="leaveContainer">
                            <span className="editUserConfirmQuestion">Are you sure you want to log out?</span>
                            <button className="editUserConfirmYes" onClick={handleLogout}>Yes</button>
                            <button className="editUserConfirmNo" onClick={() => {setLogout(false)}}>No</button>
                        </div>
                        }
                        {!deleteAccount && <button className="editUserDeleteButton" onClick={() => {setDeleteAccount(true)}}>Delete Account</button> }
                        {
                        deleteAccount
                        &&
                        <div className="leaveContainer">
                            <span className="editUserConfirmQuestion">This action is not reversible. Are you sure?</span>
                            <button className="editUserConfirmYes" onClick={handleDelete}>Yes</button>
                            <button className="editUserConfirmNo" onClick={() => {setDeleteAccount(false)}}>No</button>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default EditUser;