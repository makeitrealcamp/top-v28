import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { Formik, ErrorMessage } from 'formik'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'

const signInSchema = z.object({
  name: z.string().min(2).max(10),
  username: z.string().min(4).max(20),
  biography: z.string().max(250),
  location: z.string().max(50),
  email: z.string().email(),
  password: z.string().min(6).max(16),
})

export default function SignUp() {
  const initialValues = {
    name: '',
    username: '',
    biography: '',
    location: '',
    email: '',
    password: '',
  }

  return (
    <>
      <h1 className='fs-4 my-2 fw-bolder'>Sign Up</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          console.log(JSON.stringify(values, null, 2))
          setSubmitting(false)
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
            <h2 className='fs-5 my-4'>Personal information</h2>

            <Form.Group className='mb-3'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                onChange={handleChange}
                onBlur={handleBlur}
                name='name'
                value={values.name}
                className={touched.name && errors.name ? 'is-invalid' : ''}
                type='text'
                placeholder='Enter Name'
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
                onChange={handleChange}
                onBlur={handleBlur}
                name='username'
                value={values.username}
                className={
                  touched.username && errors.username ? 'is-invalid' : ''
                }
                type='text'
                placeholder='Enter Username'
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
                onChange={handleChange}
                onBlur={handleBlur}
                name='biography'
                value={values.biography}
                className={
                  touched.biography && errors.biography ? 'is-invalid' : ''
                }
                as='textarea'
                rows={2}
                placeholder='About you'
              />
              <ErrorMessage
                name='biography'
                component='div'
                className='invalid-feedback'
              />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Location</Form.Label>
              <Form.Control
                onChange={handleChange}
                onBlur={handleBlur}
                name='location'
                value={values.location}
                className={
                  touched.location && errors.location ? 'is-invalid' : ''
                }
                type='text'
                placeholder='Location'
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
                onChange={handleChange}
                onBlur={handleBlur}
                name='email'
                value={values.email}
                className={touched.email && errors.email ? 'is-invalid' : ''}
                type='email'
                placeholder='Enter email'
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
                onChange={handleChange}
                onBlur={handleBlur}
                name='password'
                value={values.password}
                className={
                  touched.password && errors.password ? 'is-invalid' : ''
                }
                type='password'
                placeholder='Password'
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
              disabled={isSubmitting}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </>
  )
}
