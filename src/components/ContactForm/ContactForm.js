import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import { ButAdd, StyledForm, StyledInput } from './ContactForm.styled';

const phoneRegex = RegExp(/^\(?([0-9]{3})[-. ]?([0-9]{2})[-. ]?([0-9]{2})$/);

const formShema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too short!')
    .max(50, 'Too Long!')
    .required('This field is required!'),
  number: Yup.string()
    .matches(phoneRegex, 'Invalid phone')
    .required('Phone is required'),
});

export const ContactForm = ({ onAdd }) => {
  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      validationSchema={formShema}
      onSubmit={(values, actions) => {
        onAdd(values);
        actions.resetForm();
      }}
    >
      <StyledForm>
        <label htmlFor="name">Name</label>
        <StyledInput id="name" name="name" />
        <ErrorMessage name="name" />

        <label htmlFor="number">Number</label>
        <StyledInput id="number" name="number" placeholder="111-11-11" />
        <ErrorMessage name="number" />

        <ButAdd type="submit">Add contact</ButAdd>
      </StyledForm>
    </Formik>
  );
};
