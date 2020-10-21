import { Button } from "@material-ui/core";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import { useRouter } from "next/dist/client/router";
import React, { useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import styles from "../../styles/LoginForm.module.scss";

interface Values {
  email: string;
  password: string;
}

const LoginForm = () => {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  return (
    <div>
      <Formik<Values>
        onSubmit={async (values, { setErrors }) => {
          try {
            const res = await fetch("api/login/", {
              method: "POST",
              body: JSON.stringify(values),
              headers: { "Content-Type": "application/json" },
            });
            const json = await res.json();
            if (res.status != 200) {
              setErrors(json);
            } else {
              authContext.login(json.user, json.token);
              router.push("/dashboard");
            }
          } catch (e) {
            setErrors({
              password: "Something went wrong. Please try again later.",
            });
          }
        }}
        initialValues={{ email: "", password: "" }}
        render={({ handleSubmit }) => {
          return (
            <Form className={styles.form} onSubmit={handleSubmit}>
              <Field
                name="email"
                component={TextField}
                type="email"
                variant="outlined"
                label="Email"
              />

              <Field
                name="password"
                component={TextField}
                type="password"
                variant="outlined"
                label="Password"
              />

              <Button className={styles.button} type="submit">
                Log In
              </Button>
            </Form>
          );
        }}
      />
    </div>
  );
};

export default LoginForm;
