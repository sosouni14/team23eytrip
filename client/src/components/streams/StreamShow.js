import React from 'react';
import { connect } from 'react-redux';
import flv from 'flv.js';

import { fetchStream } from '../../actions';

//클래스 StreamShow 를 React.Component에 상속받아 호출 받게 하였다
//
class StreamShow extends React.Component {
  constructor(props) {
    super(props);

    //참조한 videoRef 가 리렌더링되어도 초기값이 되지않게 createRef를 사용하였다.
    this.videoRef = React.createRef();
  }

  //componentDidMount 값을 유지하기 위해 사용하였다.
  //생성된 {id} 를 유지해준다.
  componentDidMount() {
    const { id } = this.props.match.params;

    //id 값을 받아서 넘겨준다.
    this.props.fetchStream(id);
    this.buildPlayer();
  }

  //업데이트 완료부분이다.
  //방 생성 된 것을 올리
  componentDidUpdate() {
    this.buildPlayer();
  }

  componentWillUnmount() {
    this.player.destroy();
  }

  //사이트 이용자
  buildPlayer() {
    if (this.player || !this.props.stream) {
      return;
    }

    //플래시 비디오를 열었을 경우
    //url 끝부분에는 방 생성 id가 붙는다.
    //id는 player의 방 생성 고유 번호이다. 방이 생성 될 때마다 url {id} 에 넣어준다.
    //id는 방이 만들어지는 순서대로 번호가 생기는데 그 곳에 번호를 넣으면 원하는 방으로 들어가진다.

    //{id} 생성은 고유번호를 가져와서 match 함와 동시에 호출하여 {id} 에 넣어준다.
    //사용자가 플래시 비디오를 사용할 경우 url 마지막 부분 {id}를 넣어 링크를 생성된다.
    const { id } = this.props.match.params;
    this.player = flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${id}.flv`
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }

  render() {
    //아직 스트리밍이 되지 않았을 경우
    //스트리밍 되는게 없을때 Loading... 을 보이게 한다.
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }

    //제목과 부가 설명을 값을 받아와서 보이게 한다.
    const { title, description } = this.props.stream;

    //video를 사용하기 위해 ref를 사용하여 접근하기 쉽게 한다.
    //style은 최대치로 하고 창을 줄이면 크기도 줄여진다.
    return (
      <div>
        <video ref={this.videoRef} style={{ width: '100%' }} controls />
        <h1>{title}</h1>
        <h5>{description}</h5>
      </div>
    );
  }
}

//mapStateToProps - 상태 조회해서 어떤 것들을 조회해서 ownProps 로 넣을지 정의.
//streams 을 불러와서 가져와서 match 함와 동시에 호출해서 mapStateToProps 넣는다.
const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
