// import './index.css';
import TaskList from "./TaskList";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const URL = process.env.REACT_APP_SERVER_URL


function App() {
  return (
    <div className="App">
      <TaskList />
      <ToastContainer />
    </div>
  );
}

export default App;
