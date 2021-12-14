import React from 'react';
import { connect } from 'react-redux';

import { createStream } from '../../actions';
import StreamForm from './StreamForm';

//로그인 이후 보이는 화면에 create a steram 버튼이 보이는 곳이다.
class StreamCreate extends React.Component {
  //내부적으로 일어난 formValues 을  처리할 데이터인 onSubim에 넣는다.
  onSubmit = formValues => {
    this.props.createStream(formValues);
  };

  render() {
    return (
      <div>
        <h3>Create a Stream</h3>
        {/* 발생된 this.onSubmit을 onSubmit에 넣는다. */}
        <StreamForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(null, { createStream })(StreamCreate);
