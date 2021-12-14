import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';


class StreamEdit extends React.Component {
  componentDidMount() {
    //사용자의 데이터인 id 불러와서 math와 호출하여 서버에 담는다.
    this.props.fetchStream(this.props.match.params.id);
  }

  //방 생성 구간에서 수정하고 싶다면 사용자의 데이터인 id 불러와서
  //생성할때 데이터를 formValues 에 담는다.
  onSubmit = formValues => {
    this.props.editStream(this.props.match.params.id, formValues);
  };

  //stream 수정 버튼 부분
  render() {
    //만약 stream 을 불러오지 않는다면 로딩...
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <h3>Edit a Stream</h3>
        <StreamForm
          initialValues={_.pick(this.props.stream, 'title', 'description')}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}
//mapStateToProps - 상태 조회해서 어떤 것들을 조회해서 ownProps 로 넣을지 정의.
//streams 을 불러와서 가져와서 match 함와 동시에 호출해서 mapStateToProps 넣는다.
const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, editStream })(
  StreamEdit
);
