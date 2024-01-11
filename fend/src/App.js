import EditTask from "./comonenets/EditTask";
import ListOfTasks from "./comonenets/ListOfTasks";
import { Routes, Route } from "react-router-dom";
import Test from "./comonenets/Test";

function App() {
  return (
    <div className="App">
      {/* <Test /> */}
      <Routes>
        <Route path="/" element={<ListOfTasks />} />
        <Route path="/editTask/:id" element={<EditTask />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </div>
  );
}

export default App;
