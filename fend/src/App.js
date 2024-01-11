import EditTask from "./comonenets/EditTask";
import ListOfTasks from "./comonenets/ListOfTasks";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <Test /> */}
      <Routes>
        <Route path="/" element={<ListOfTasks />} />
        <Route path="/editTask/:id" element={<EditTask />} />
      </Routes>
    </div>
  );
}

export default App;
