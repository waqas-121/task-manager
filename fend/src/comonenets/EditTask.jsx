import { React, useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EditTask() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({});
  const [confirmationValues, setConfirmationValues] = useState(false);

  // console.log(initialValues, "intialValues");
  useEffect(() => {
    getById(id);
  }, [id]);

  const getById = (id) => {
    axios
      .get(`http://localhost:3001/api/v1/tasks/${id}`)
      .then((res) => {
        setInitialValues(res.data);
        // setNewTaskValue(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const hundleOnSubmit = (data) => {
    const taskData = {
      task: data.task, // Assuming "task" is the property you want to send
    };
    if (taskData.task.length < 10) {
      alert("Please Write At Least 10 Chars..");
    }
    if (taskData.task.length > 10 && !confirmationValues) {
      alert("Please Select the Confirmation Field");
    }
    if (taskData.task.length > 10 && confirmationValues) {
      axios
        .patch(`http://localhost:3001/api/v1/tasks/${id}`, taskData)
        .then(() => {
          // console.log(data.task.length);
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const hundleOnConfirmation = () => {
    setConfirmationValues(true);
    // console.log("clicked confirmation");
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
            enableReinitialize
            onSubmit={hundleOnSubmit}
          >
            <Form className="container">
              <div className="d-flex justify-content-center mb-4">
                Task Manager
              </div>
              <label>Id</label>
              <Field
                autoComplete="off"
                id="id"
                name="id"
                className="form-control"
                value={initialValues.id}
                readOnly
              />
              {/* <ErrorMessage name="task" component="span" /> */}
              <label>Task</label>
              <Field
                autoComplete="off"
                id="task"
                name="task"
                className="form-control"
              />
              <div className="">
                <label htmlFor="Confrimation" className="m-2">
                  Confimation
                </label>
                <input
                  type="radio"
                  value={confirmationValues}
                  name="confirmation"
                  onChange={() => hundleOnConfirmation()}
                />
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
