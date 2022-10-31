import { useState } from 'react';
import './App.scss';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Heading } from './components/Heading/Heading';
import { SuccessBlock } from './components/SuccessBlock/SuccessBlock';
import { RegisterForm } from './components/RegisterForm/RegisterForm';
import { UsersBlock } from './components/UsersBlock/UsersBlock';

function App() {
  const [update, setUpdate] = useState(false)

  return (
    <div className="App">
      <Header />
      <main>
        <Heading />
        <UsersBlock isUpdate={update}/>
        {
          update ?
          <SuccessBlock />
          :
          <RegisterForm onSuccess={setUpdate}/>
        }
      </main>
      <Footer />
    </div>
  );
}

export default App;
