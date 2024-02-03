import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { VscAccount } from "react-icons/vsc";
import './Profile.scss'
import RecipeCard from '../../Recipe/RecipeCard/RecipeCard'
import { getLoggedUser, logout } from '../../../features/auth/authSlice'
import Loading from '../../common/Loading/Loading';
import { useNavigate } from 'react-router-dom';
const Profile = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userProfile = useSelector((state) => state.auth.user)
    const userRecipes = useSelector((state) => state.auth.userRecipes)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
        dispatch(getLoggedUser())
    }, [])
    const handleLogout = () => {
        () => dispatch(logout())
    }
    if (!userProfile) { return <Loading /> }
    return (
        <div className='profile-page'>
            <div className="user-container">
                <div className="user-avatar avatar">
                    {user.avatar ? <img src={user.avatar} alt="" /> : <VscAccount />}
                </div>
                <div className="user-info">
                    <h2>{user.firstName} {user.lastName}</h2>
                    <h3>{user.email}</h3>
                    <p>{user.role}</p>
                </div>
            </div>
            <div>
                {userRecipes?.map((recipe) =>
                    < RecipeCard key={recipe._id} recipe={recipe} />
                )}
            </div>
            <button type='button' onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Profile