import React from 'react';
import Chat from './component/chat/Chat';
import Detail from './component/detail/Detail';
import List from './component/list/List';


const App = () => {
    return (
      <div className='container'>
        <List/>
        <Chat/>
        <Detail/>
      </div>
    )
  }
  
  export default App