import { Formik, ErrorMessage } from 'formik';
import { useContext, useReducer } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import UserContext from '../containers/UserContext';
import { signIn } from '../api/users';
import { formatError } from '../utils';
import useFetchState from '../domain/useFetchState';

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(16),
});

export default function SignIn() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [{ error, loading }, dispatch] = useFetchState();

  const initialValues = {
    email: '',
    password: '',
  };

  return (
    <>
      <h1 className="fs-4 my-2 fw-bolder">Sign In</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          dispatch({ type: 'INIT' });
          try {
            dispatch({ type: 'FETCH' });
            const { data } = await signIn(values);

            dispatch({ type: 'FULLFILLED' });
            setUser(data);
            navigate('/home');
          } catch (e) {
            const message = formatError(e);
            dispatch({ type: 'REJECTED', payload: message });
          }
        }}
        validationSchema={toFormikValidationSchema(signInSchema)}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                className={touched.email && errors.email ? 'is-invalid' : ''}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="invalid-feedback"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className={
                  touched.password && errors.password ? 'is-invalid' : ''
                }
              />
              <ErrorMessage
                name="password"
                component="div"
                className="invalid-feedback"
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="rounded-pill text-white px-4"
              disabled={loading}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}
