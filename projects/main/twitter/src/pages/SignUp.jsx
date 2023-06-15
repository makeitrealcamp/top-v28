import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Formik, ErrorMessage } from 'formik';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

const signUpSchema = z.object({
  name: z.string().max(20),
  username: z.string().min(5).max(15),
  about: z.string().min(10).max(280),
  location: z.string().max(30),
  email: z.string().email(),
  password: z.string().min(6).max(16),
});

export default function SignUp() {
  const initialValues = {
    name: '',
    username: '',
    about: '',
    location: '',
    email: '',
    password: '',
  };

  return (
    <>
      <h1 className='fs-4 my-2 fw-bolder'>Sign Up</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
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
        }) => (
          <Form onSubmit={handleSubmit}>
            <h2 className='fs-5 my-4'>Personal information</h2>

            <Form.Group className='mb-3'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Name'
                name='name'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                className={touched.name && errors.name ? 'is-invalid' : ''}
              />
              <ErrorMessage
                name='name'
                component='div'
                className='invalid-feedback'
              />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Username'
                name='username'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                className={
                  touched.username && errors.username ? 'is-invalid' : ''
                }
              />
              <ErrorMessage
                name='username'
                component='div'
                className='invalid-feedback'
              />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Biography</Form.Label>
              <Form.Control
                as='textarea'
                rows={2}
                placeholder='About you'
                name='about'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.about}
                className={touched.about && errors.about ? 'is-invalid' : ''}
              />
              <ErrorMessage
                name='about'
                component='div'
                className='invalid-feedback'
              />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Location</Form.Label>
              <Form.Control
                type='text'
                placeholder='Location'
                name='location'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.location}
                className={
                  touched.location && errors.location ? 'is-invalid' : ''
                }
              />
              <ErrorMessage
                name='location'
                component='div'
                className='invalid-feedback'
              />
            </Form.Group>

            <h2 className='fs-5 my-4'>Login information</h2>

            <Form.Group className='mb-3'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                name='email'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                className={touched.email && errors.email ? 'is-invalid' : ''}
              />
              <ErrorMessage
                name='email'
                component='div'
                className='invalid-feedback'
              />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Password'
                name='password'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className={
                  touched.password && errors.password ? 'is-invalid' : ''
                }
              />
              <ErrorMessage
                name='password'
                component='div'
                className='invalid-feedback'
              />
            </Form.Group>

            <Button
              variant='primary'
              type='submit'
              className='rounded-pill text-white px-4'
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}
