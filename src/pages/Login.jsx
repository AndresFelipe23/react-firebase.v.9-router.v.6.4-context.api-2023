import { Formik } from "formik";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../config/firebase";
import { useUserContext } from "../context/UserContext";
import * as Yup from "yup";

const Login = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user]);

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      await login({ email: values.email, password: values.password });
      console.log("user logged in");
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().trim().min(6).required()
  });

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="mb-4 text-2xl font-bold text-gray-700">Login</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            isSubmitting,
            errors,
            touched,
            handleBlur
          }) => (
            <form
              onSubmit={handleSubmit}
              className="p-4 bg-white rounded shadow-md"
            >
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Email
              </label>
              <input
                className="w-full mb-4 p-2 border border-gray-300 rounded"
                type="text"
                placeholder="email"
                value={values.email}
                onChange={handleChange}
                name="email"
                onBlur={handleBlur}
              />
              {errors.email && touched.email && errors.email}
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-600"
              ></label>
              <input
                className="w-full mb-4 p-2 border border-gray-300 rounded"
                type="password"
                placeholder="password"
                value={values.password}
                onChange={handleChange}
                name="password"
                onBlur={handleBlur}
              />
              {errors.password && touched.password && errors.password}
              <button
                className="w-full p-2 bg-blue-500 text-white rounded"
                type="submit"
                disabled={isSubmitting}
              >
                Login
              </button>
              <Link
                to="/register"
                className="w-full mt-4 p-2 bg-green-500 text-white rounded inline-block text-center"
              >
                Register
              </Link>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Login;
