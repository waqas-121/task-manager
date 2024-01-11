import { React, useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EditTask() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [listOfTask, setListOfTask] = useState([]);

  useEffect(() => {
    getById();
  }, []);

  const getById = (id) => {
    axios
      .get(`http://localhost:3001/api/v1/tasks/${id}`)
      .then((res) => {
        setListOfTask(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("using parms", id);
  };

  const initialValues = {
    id: "",
    task: "",
  };

  // const validationScheema = Yup.object().shape({
  //   task: Yup.string().required("You must input the task").max(70).min(10),
  // });
  const hundleOnBackToMain = () => {
    navigate("/");
  };

  return (
    <div>
      <div className="row mt-5 ">
        <div className="col-2"></div>
        <div className="col-8 border pt-4 pb-5">
          <Formik
            initialValues={initialValues}
            // validationSchema={validationScheema}
            // onSubmit={hundleOnSubmit}
          >
            <Form className="container">
              <div className="d-flex justify-content-center mb-4">
                Task Manager
              </div>
              <ErrorMessage name="task" component="span" />
              <label>Id</label>
              <Field
                autoComplete="off"
                id="inputTask"
                name="task"
                className="form-control"
              />
              <label>Task</label>
              <Field
                autoComplete="off"
                id="inputTask"
                name="task"
                className="form-control"
              />
              <div className="">
                <label htmlFor="" className="m-2">
                  Confimation
                </label>
                <input type="radio" />
              </div>
              <div className="row">
                <div className="d-grid gap-2 col-6 mx-auto mt-3  ">
                  <button type="submit" className="btn btn-primary ">
                    Edit
                  </button>
                </div>
                <div className="d-grid gap-2 col-6 mx-auto mt-3  ">
                  <button
                    className="btn btn-primary "
                    onClick={() => hundleOnBackToMain()}
                  >
                    Back To Main
                  </button>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  );
}
