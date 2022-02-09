import React from 'react';
import { NewEntry } from '../types';
import { Field, Formik, Form } from "formik";
import { TextField, DiagnosisSelection, NumberField } from '../AddPatientModal/FormField';
import { Grid, Button } from "semantic-ui-react";
import { useStateValue } from '../state/state';

interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

const HospitalForm = ({onSubmit, onCancel}: Props) => {
  const [{ diagnosis }] = useStateValue();
  return (
    <Formik
      initialValues={{
        date: "",
        type: "Hospital",
        specialist: "",
        diagnosisCodes: [],
        description: "",
        discharge: {
          date: "",
          criteria: "",
        }
      }}
      onSubmit={onSubmit}
      validate={values => {
        const required = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = required;
        }
        if (!values.specialist) {
          errors.specialist = required;
        }
        if (!values.diagnosisCodes) {
          errors.diagnosisCodes = required;
        }
        if (!values.description) {
          errors.description = required;
        }
        return errors;
      }}
    >
      {({isValid, dirty, setFieldValue, setFieldTouched}) => {
        return <Form className='form ui'>
          <Field
            label="Date"
            placeholder="Date"
            name="date"
            component={TextField}
          />
          <Field
            label="Specialist"
            placeholder="Specialist"
            name="specialist"
            component={TextField}
          />
          <DiagnosisSelection            
            setFieldValue={setFieldValue}            
            setFieldTouched={setFieldTouched}            
            diagnoses={Object.values(diagnosis)}          
          /> 
          <Field
            label="Description"
            placeholder="Description"
            name="description"
            component={TextField}
          />
          <Field
            label="Discharge Date"
            placeholder="Discharge Date"
            name="discharge.date"
            component={TextField}
          />
          <Field
            label="Discharge Criteria"
            placeholder="Discharge Criteria"
            name="discharge.criteria"
            component={TextField}
          />

          <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
        </Form>;
      }}
    </Formik>
  );
};

const OccupationalForm = ({onSubmit, onCancel}: Props) => {
  const [{ diagnosis }] = useStateValue();
  return (
    <Formik
      initialValues={{
        date: "",
        type: "OccupationalHealthcare",
        specialist: "",
        diagnosisCodes: [],
        description: "",
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: ""
        }
      }}
      onSubmit={onSubmit}
      validate={values => {
        const required = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = required;
        }
        if (!values.specialist) {
          errors.specialist = required;
        }
        if (!values.diagnosisCodes) {
          errors.diagnosisCodes = required;
        }
        if (!values.description) {
          errors.description = required;
        }
        return errors;
      }}
    >
      {({isValid, dirty, setFieldValue, setFieldTouched}) => {
        return <Form className='form ui'>
          <Field
            label="Date"
            placeholder="Date"
            name="date"
            component={TextField}
          />
          <Field
            label="Specialist"
            placeholder="Specialist"
            name="specialist"
            component={TextField}
          />
          <DiagnosisSelection            
            setFieldValue={setFieldValue}            
            setFieldTouched={setFieldTouched}            
            diagnoses={Object.values(diagnosis)}          
          /> 
          <Field
            label="Description"
            placeholder="Description"
            name="description"
            component={TextField}
          />
          <Field
            label="Employer Name"
            placeholder="Employer Name"
            name="employerName"
            component={TextField}
          />
          <Field
            label="Sick Leave Start"
            placeholder="Sick Leave Start"
            name="sickLeave.startDate"
            component={TextField}
          />
          <Field
            label="Sick Leave End"
            placeholder="Sick Leave End"
            name="sickLeave.endDate"
            component={TextField}
          />

          <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
        </Form>;
      }}
    </Formik>
  );
};

const HealthCheckForm = ({onSubmit, onCancel}: Props) => {
  return (
    <Formik
      initialValues={{
        date: "",
        type: "HealthCheck",
        specialist: "",
        description: "",
        healthCheckRating: 0,
      }}
      onSubmit={onSubmit}
      validate={values => {
        const required = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = required;
        }
        if (!values.specialist) {
          errors.specialist = required;
        }
        if (!values.description) {
          errors.description = required;
        }
        return errors;
      }}
    >
      {({isValid, dirty}) => {
        return <Form className='form ui'>
          <Field
            label="Date"
            placeholder="Date"
            name="date"
            component={TextField}
          />
          <Field
            label="Specialist"
            placeholder="Specialist"
            name="specialist"
            component={TextField}
          />
          <Field
            label="Description"
            placeholder="Description"
            name="description"
            component={TextField}
          />
          <Field
            label="Rating"
            placeholder="Rating"
            name="healthCheckRating"
            component={NumberField}
          />

          <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
        </Form>;
      }}
    </Formik>
  );
};

const AddEntryForm = ({onSubmit, onCancel}: Props) => {
  const [type,setType] = React.useState<string>("");
  const handleType = (type: string) => {
    setType(type);
  };

  
  return(
    <>
      <div>
        <button onClick={() => {handleType("Hospital");}}>Hospital Form</button>
        <button onClick={() => {handleType("Occupational");}}>Occupational Form</button>
        <button onClick={() => {handleType("Health");}}>HealthCheck Form</button>
      </div>
      {
        type === "Hospital" 
        ? <HospitalForm onSubmit={onSubmit} onCancel={onCancel}/>
        : type === "Occupational"
        ? <OccupationalForm onSubmit={onSubmit} onCancel={onCancel}/>
        : type === "Health"
        ? <HealthCheckForm onSubmit={onSubmit} onCancel={onCancel}/>
        : null
      }
      
      
    </>
  );
};

export default AddEntryForm;