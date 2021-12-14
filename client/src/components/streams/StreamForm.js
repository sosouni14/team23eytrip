import React from 'react';
import { Field, reduxForm } from 'redux-form';


class StreamForm extends React.Component {
  renderError({ error, touched }) {
    //만약 touched && error 일 경우
    //메시지를 띄어준다.
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  //field : https://dustink.tistory.com/39
  renderInput = ({ input, label, meta }) => {
    //field - 고유 데이터, 현재 상태의 데이터 저장
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  };

  //create 이후 버튼을 누른 후 보이는 스트리밍 생성 부분이다.
  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

//validate 를 formValues에 넣고..
const validate = formValues => {
  const errors = {};

  //만약 formValues에 title이 아닐 경우
  //제목 넣으라고 에러 발생
  if (!formValues.title) {
    errors.title = 'You must enter a title';
  }

  //만약 formValues에 description이 아닐 경우
  //부가설명에 적으라고 err 발생 
  if (!formValues.description) {
    errors.description = 'You must enter a description';
  }

  return errors;
};

export default reduxForm({
  form: 'StreamForm',
  validate
})(StreamForm);
