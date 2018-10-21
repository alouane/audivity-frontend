import React from 'react'
import { Field, reduxForm } from 'redux-form'

//Add url validation  => Required && look for numbers, date...
const validate = (values, props) => {
  const errors = {}
  console.log(values);
  // console.log(props);
  if (!values.url) {
    errors.url = 'URL Required'
  }
  if (!values.email) {
    errors.email = 'Email Required'
  }

  // if(values.url && values.age && values.gender && values.industry) props.changeStep('step3');
  if(values.url && values.email) props.changeStep('step3');
  else if(values.url && values.age || values.url && values.gender) props.changeStep('step2');
  else if (values.url) props.changeStep('step1');
  
 
  //  else if (!/(\d{4})([\/-])(\d{1,2})\2(\d{1,2})/.test(values.url)) {
  //   errors.url = 'Hmm, doesn’t look like you’ve submitted a link to a specific blog posts. Try again.'
  // }

  return errors
}

const warn = values => {
  const warnings = {}
  return warnings
}

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <input {...input} placeholder={label} type={type} className="form-control px-4 pt-2 " />
    <div className="error">{touched && ((error && <div className="label"><i className="ion-alert"> </i> &nbsp; {error}</div>) || (warning && <div>{warning}</div>))}</div>
  </div>
)

export const renderSelect = ({
  input,
  label,
  meta: { touched, error },
  children
}) => (
    <div className="select">
      {/* <label>{label}</label> */}
      <div className="control">
        <div className={
          'select ' + (touched ? (error ? 'is-danger' : 'is-success') : '')
        }>
          <select {...input} >
            {children}
          </select>
          {touched && (error && <p className="help is-danger">{error}</p>)}
        </div>
      </div>
    </div>
  );

let UrlForm = (props) => {
  const { handleSubmit, pristine, reset, submitting, onChange } = props
  return (
    <form className="mt-3" onSubmit={handleSubmit}>
      {/* url */}
      <div className="form-group mr-1 input-container url">
      <div className="input-label">Link to article:</div>
      {/* <i class="fa fa-user icon"></i> */}
        <Field component={renderField} type="text" label="http://www.website.com/article_1" name="url"/>
      </div>

      {/* age */}
      <div className="form-group mr-1 input-container url">
      <div className="input-label">Select Your Voice-Over Age:</div>
        <Field component={renderSelect} name="age" label="Select voice-over age">
          <option value="18_and_60" selected>Not relevant</option>
          <option value="18_and_25">Between 18 and 25</option>
          <option value="26_and_35">Between 26 and 35</option>
          <option value="36_and_45">Between 36 and 45</option>
          <option value="46_and_60">Between 46 and 60</option>
        </Field>
      </div>

      <br/>
      <br/>

      {/* gender */}
      <div className="form-group mr-1 input-container url">
      <div className="input-label">Select Your Voice-Over Gender:</div>
        <Field component={renderSelect} name="gender" label="Select voice-over gender">
          <option value="" selected>Not relevant</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </Field>
      </div>
      <br/>
      <br/>

      {/* industry */}
      <div className="input-label">What industry are you in ?:</div>
      <div className="form-group mr-1 input-container url desc">
        <Field component={renderField} type="text" label="(e.g., Computer science, Music,...)" name="industry" />
      </div>

      {/* personal infos */}
      <div className="form-group mr-1 input-container url">
      <div className="input-label">Your email adress:</div>
        <Field component={renderField} type="text" label="jon@dough.com" name="email"/>
      </div>

      <div className="form-group mr-1 input-container url">
      <div className="input-label">Your company:</div>
        <Field component={renderField} type="text" label="TheGuardian" name="company"/>
      </div>



      <button className="btn btn-primary px-4 pt-2">Submit &nbsp;<i className="ion-android-arrow-forward"> </i></button>
    </form>
  )
}

UrlForm = reduxForm({
  // a unique name for the form
  form: 'url',
  validate
})(UrlForm)

export default UrlForm