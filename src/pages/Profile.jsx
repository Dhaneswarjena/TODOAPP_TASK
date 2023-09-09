import React, { useContext } from 'react'
import Loader from '../Component/Loader'
import { context } from '../main';
const Profile = () => {
    const {load,user} = useContext(context);
      return load ? (
        <Loader />
      ) : (
        <div>
          <h1>{user?.name}</h1>
          <p>{user?.email}</p>
        </div>
      );
    };
    

export default Profile