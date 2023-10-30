import { Formik } from 'formik';
import { Image, Text, TextInput, View } from 'react-native';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { z } from 'zod';

import globalStyles from '../App.styles.js';
import TouchButton from '../components/TouchButton.jsx';
import Separator from '../components/Separator.jsx';

const signUpSchema = z.object({
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(6).max(16),
});

const initialValues = {
  name: '',
  username: '',
  email: '',
  password: '',
};

export default function SignUp() {
  return (
    <View style={globalStyles.container}>
      <Image
        source={require('../assets/logo.png')}
        style={[globalStyles.logo.big, globalStyles.space]}
      />
      <Text style={globalStyles.h1}>Welcome</Text>

      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setSubmitting }) => {
          console.log(values);
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
          <View style={[globalStyles.wrapper]}>
            <TextInput
              style={[
                globalStyles.input,
                globalStyles.space,
                touched.name && errors.name && globalStyles.inputError,
              ]}
              autoComplete="name"
              placeholder="Name"
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />
            <TextInput
              style={[
                globalStyles.input,
                globalStyles.space,
                touched.username && errors.username && globalStyles.inputError,
              ]}
              autoCapitalize="none"
              autoComplete="username"
              placeholder="Username"
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
            />
            <TextInput
              style={[
                globalStyles.input,
                globalStyles.space,
                touched.email && errors.email && globalStyles.inputError,
              ]}
              autoCapitalize="none"
              autoComplete="email"
              placeholder="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            <TextInput
              style={[
                globalStyles.input,
                globalStyles.space,
                touched.password && errors.password && globalStyles.inputError,
              ]}
              secureTextEntry
              placeholder="Password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            <TouchButton title="Sign Up" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
      <View style={[globalStyles.wrapper, globalStyles.space]}>
        <Separator text="or" />
      </View>
      <Text style={globalStyles.space}>Do you already have an account?</Text>
      <View style={[globalStyles.wrapper]}>
        <TouchButton title="Sign In" variant="secondary" />
      </View>
    </View>
  );
}
