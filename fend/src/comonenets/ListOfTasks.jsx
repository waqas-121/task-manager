import { React, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function CreateTask() {
  const navigate = useNavigate();
  const [listOfTask, setListOfTask] = useState([]);
  const initialValues = {
    task: "",
  };

  const validationScheema = Yup.object().shape({
    task: Yup.string().required("You must input the task").max(70).min(10),
  });

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = () => {
    axios
      .get("http://localhost:3001/api/v1/tasks")
      .then((res) => {
        setListOfTask(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const hundleOnDelete = (id) => {
    axios
      .delete(`http://localhost:3001/api/v1/tasks/${id}`)
      .then(() => {
        getTasks();
        console.log("clicked!!");
      })
      .catch((error) => {
        console.log("This is delete error", error);
      });
  };

  const hundleOnEdit = (id) => {
    navigate(`/editTask/:${id}`);
    console.log(`edit button clicked `);
  };
  const hundleOnSubmit = (data, { resetForm }) => {
    axios
      .post("http://localhost:3001/api/v1/tasks", data)
      .then((res) => {
        setListOfTask((preTask) => [...preTask, res.data]);
        resetForm();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="row mt-5 ">
        <div className="col-2"></div>
        <div className="col-8 border pt-4 pb-5">
          <Formik
            initialValues={initialValues}
            validationSchema={validationScheema}
            onSubmit={hundleOnSubmit}
          >
            <Form className="container">
              <div className="d-flex justify-content-center mb-4">
                Task Manager
              </div>
              <ErrorMessage name="task" component="span" />
              <Field
                autoComplete="off"
                id="inputTask"
                name="task"
                className="form-control"
                placeholder="Task..."
              />
              <div className="d-grid gap-2 col-6 mx-auto mt-3  ">
                <button type="submit" className="btn btn-primary ">
                  Add
                </button>
              </div>
            </Form>
          </Formik>
        </div>
        <div className="col-2"></div>
      </div>
      <div className="row pt-2">
        <div className="col-2"></div>
        <div className="col-8 pt-4 pb-5 ">
          {listOfTask.map((value, key) => (
            <div className="mb-2" key={key}>
              <li className="list-group-item list-group-item-primary">
                {value.task}
                <div className="d-flex justify-content-end ">
                  <i
                    className="bi bi-trash3 m-2 "
                    onClick={() => hundleOnDelete(value.id)}
                  ></i>
                  <i
                    className="bi bi-pencil-square  m-2"
                    onClick={() => hundleOnEdit(value.id)}
                  ></i>
                </div>
              </li>
            </div>
          ))}
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  );
}
