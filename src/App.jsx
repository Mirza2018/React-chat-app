import React from 'react';
import Chat from './component/chat/Chat';
import Detail from './component/detail/Detail';
import List from './component/list/List';
import Login from './component/login/Login';


const App = () => {
  const user=false;

    return (
      <div className='container'>
        {
          user?
          <>
          <List/>
        <Chat/>
        <Detail/>
     </>
          :
          <Login/>
        }
        
      </div>
    )
  }
  
  export default App