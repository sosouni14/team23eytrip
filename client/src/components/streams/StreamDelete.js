import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Modal from '../Modal';
import history from '../../history';
import { fetchStream, deleteStream } from '../../actions';

//클래스 StreamDelete 를 React.Component에 상속받아 호출 받게 하였다
class StreamDelete extends React.Component {
  //prop: https://www.codingfactory.net/10341
  //값 유지
  //props를 사용해서 id 가져온 것을 fetchStream에 넣는다.
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  // {id} 에 매치된 변수들을 props를 이용하여 넣은 값
  renderActions() {
    const { id } = this.props.match.params;

    return (
      <React.Fragment>
        <button
        //삭제를 하기 위해 id를 가져와서 삭제를 한다.
          onClick={() => this.props.deleteStream(id)}
          className="ui button negative"
        >
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </React.Fragment>
    );
  }

  renderContent() {
    //만약 stream을 가져오지 못할경우 text를 보여준다
    if (!this.props.stream) {
      return 'Are you sure you want to delete this stream?';
    }

    //올바르게 할 경우 stream의 제목을 불러와서 삭제할건지 물어본다.
    return `Are you sure you want to delete the stream with title: ${this.props.stream.title}?`;
  }

  render() {
    return (
      <Modal
        title="Delete Stream"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/')}
      />
    );
  }
}

const matchStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(matchStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
