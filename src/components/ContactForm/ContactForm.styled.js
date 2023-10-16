import styled from 'styled-components';
import { Form, Field } from 'formik';

export const StyledForm = styled(Form)`
  width: 50%;
  padding: 18px 36px 18px 4px;

  display: flex;
  flex-direction: column;
  gap: ${p => p.theme.spacing(2)};

  border: 1px solid;
`;

export const ButAdd = styled.button`
  width: 50%;
`;

export const StyledInput = styled(Field)`
  border-color: #80808052;
`;
