import { Formik, ErrorMessage } from 'formik';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { z } from 'zod';
import { signUp } from '../api/users';
import { useNavigate } from 'react-router-dom';

const signUpSchema = z.object({
  name: z.string(),
  username: z.string(),
  biography: z.string(),
  location: z.string(),
  email: z.string().email(),
  password: z.string().min(6).max(16),
});

export default function SignUp() {
  const navigate = useNavigate();
  const initialValues = {
    name: '',
    username: '',
    biography: '',
    location: '',
    email: '',
    password: '',
  };
  return (
    <>
      <h1 className="fs-4 my-2 fw-bolder">Sign Up</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setSubmitting }) => {
          const formData = new FormData();
          for (const value in values) {
            formData.append(value, values[value]);
          }

          const { data } = await signUp(formData);
          setSubmitting(false);
          navigate('/signin');
        }}
        validationSchema={toFormikValidationSchema(signUpSchema)}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <Form onSubmit={handleSubmit}>
            <h2 className="fs-5 my-4">Personal information</h2>

            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                className={touched.name && errors.name ? 'is-invalid' : ''}
              />
              <ErrorMessage
                name="name"
                component="div"
                className="invalid-feedback"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                name="username"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                className={
                  touched.username && errors.username ? 'is-invalid' : ''
                }
              />
              <ErrorMessage
                name="username"
                component="div"
                className="invalid-feedback"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Profile Photo</Form.Label>
              <Form.Control
                type="file"
                name="profilePhoto"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setFieldValue('profilePhoto', file);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Biography</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="About you"
                name="biography"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.biography}
                className={
                  touched.biography && errors.biography ? 'is-invalid' : ''
                }
              />
              <ErrorMessage
                name="biography"
                component="div"
                className="invalid-feedback"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Location"
                name="location"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.location}
                className={touched.location && errors.email ? 'is-invalid' : ''}
              />
              <ErrorMessage
                name="location"
                component="div"
                className="invalid-feedback"
              />
            </Form.Group>

            <h2 className="fs-5 my-4">Login information</h2>

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
              disabled={isSubmitting}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}
