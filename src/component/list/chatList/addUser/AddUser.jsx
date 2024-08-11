import React from 'react';
import './addUser.css'

const AddUser = () => {
    return (
        <div className='addUser'>
            <form action="">
                <input type="text" placeholder='UserName' name='userName' />
                <button className='first'>Search</button>
            </form>
            <div className="user">
                <div className="detail">
                    <img src="./avatar.png" alt="" />
                    <span>Mirza 007</span>
                </div>
                <button>Add User</button>
            </div>
        </div>
    );
};

export default AddUser;

