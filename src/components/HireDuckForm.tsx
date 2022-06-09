import { FC } from "react";
import { DuckProspectType } from "../services/duck";

import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { createRandomDuck } from "../services/random";
import Button from "./Button";
import Input from "./Input";

const schema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required")
});

type Props = {
  hireDuck: (prospect: DuckProspectType) => void;
};

const HireDuckForm: FC<Props> = ({ hireDuck }) => {
  return (
    <Formik
      initialValues={{
        firstName: "Benedictus",
        lastName: "Lohiposki"
      }}
      onSubmit={(values) => {
        const prospect: DuckProspectType = {
          ...createRandomDuck(),
          ...values
        };
        hireDuck(prospect);
      }}
      validateOnMount
      validationSchema={schema}
    >
      {({ isValid }) => {
        return (
          <Form>
            <div>
              <label htmlFor="firstName">Etunimi</label>
              <Field type="text" name="firstName" as={Input} />
              <ErrorMessage name="firstName" />
            </div>
            <div>
              <label htmlFor="lastName">Sukunimi</label>
              <Field type="text" name="lastName" as={Input} />
              <ErrorMessage name="lastName" />
            </div>
            <div>
              <Button type="submit" disabled={!isValid}>
                palkkaa
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default HireDuckForm;
