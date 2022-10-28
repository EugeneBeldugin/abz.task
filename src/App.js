import { useState } from 'react';
import './App.scss';
import { Header } from './components/Header/Header';
import { Heading } from './components/Heading/Heading';
import { RegisteredBlock } from './components/RegisteredBlock/RegisteredBlock';
import { RegisterForm } from './components/RegisterForm/RegisterForm';
import { UsersBlock } from './components/UsersBlock/UsersBlock';

function App() {
  const [update, setUpdate] = useState(false)

  return (
    <div className="App">
      <Header />
      <Heading />
      <UsersBlock isUpdate={update}/>
      <RegisterForm onSuccess={setUpdate}/>
      {
        update && <RegisteredBlock />
      }
    </div>
  );
}

export default App;
