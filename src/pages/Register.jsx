import { Formik } from "formik";
import * as Yup from "yup";
import { register } from "../config/firebase";
import { useUserContext } from "../context/UserContext";
import { useRedirectActiveUser } from "../hooks/useRedirectActiveUser";

import { Link } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { useRef, useState } from "react";

const Register = () => {
  const { user } = useUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();
  };

  // alternativa con hook
  useRedirectActiveUser(user, "/dashboard");

  const onSubmit = async (
    { nombre, apellido, edad, ciudad, email, password },
    { setSubmitting, setErrors, resetForm }
  ) => {
    try {
      await register({ nombre, apellido, edad, ciudad, email, password });
      // ...
    } catch (error) {
      // Manejar errores
    } finally {
      setSubmitting(false);
    }
  };

  // Agregar los campos adicionales en el esquema de validación
  const validationSchema = Yup.object().shape({
    nombre: Yup.string().required("El nombre es requerido"),
    apellido: Yup.string().required("El apellido es requerido"),
    edad: Yup.number().required("La edad es requerida").positive().integer(),
    ciudad: Yup.string().required("La ciudad es requerida"),
    email: Yup.string()
      .email("Email inválido")
      .required("El email es requerido"),
    password: Yup.string()
      .trim()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .required("La contraseña es requerida")
  });

  return (
    <Formik
      initialValues={{
        nombre: "",
        apellido: "",
        edad: "",
        ciudad: "",
        email: "",
        password: ""
      }}
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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <h1 className="mb-4 text-2xl font-bold text-gray-700">Register</h1>

          <form
            onSubmit={handleSubmit}
            className="p-4 bg-white rounded shadow-md"
          >
            <label
              htmlFor="Nombre"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Nombres
            </label>
            <input
              type="text"
              id="Nombre"
              name="nombre"
              value={values.nombre}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full mb-4 p-2 border border-gray-300 rounded"
            />
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Apellidos
            </label>
            <input
              type="text"
              id="Apellidos"
              name="apellido"
              value={values.apellido}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full mb-4 p-2 border border-gray-300 rounded"
            />
            <label
              htmlFor="Edad"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Edad
            </label>
            <input
              type="number"
              id="edad"
              name="edad"
              value={values.edad}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full mb-4 p-2 border border-gray-300 rounded"
            />
            <label
              htmlFor="Ciudad"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Ciudad
            </label>
            <input
              type="text"
              id="ciudad"
              name="ciudad"
              value={values.ciudad}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full mb-4 p-2 border border-gray-300 rounded"
            />
            <label
              htmlFor="ciudad"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full mb-4 p-2 border border-gray-300 rounded"
            />
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full mb-4 p-2 border border-gray-300 rounded"
            />
            <button
              component={Link}
              to="/"
              type="submit"
              className="w-full  p-2 bg-green-500 text-white rounded"
            >
              Register
            </button>
            <Link
              type="submit"
              component={Link}
              to="/"
              className="w-full mt-4 p-2 bg-blue-500 text-white rounded text-center"
            >
              Login
            </Link>
          </form>
        </div>
      )}
    </Formik>
  );
};

export default Register;
