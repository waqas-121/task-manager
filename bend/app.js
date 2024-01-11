const express = require("express");
const cors = require("cors");
const tasks = require("./routes/tasksRoute");
const db = require("./models");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = "3001";

// app.get("/api/v1/tasks")         - get all task
// app.post("/api/v1/tasks")        - create task
// app.get("/api/v1/tasks/:id")     - get single task
// app.patch("/api/v1/tasks/:id")   - update task
// app.delete("/api/v1/tasks/:id")  - delete task

app.use("/api/v1/tasks", tasks);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log("Server running on", PORT);
  });
});
