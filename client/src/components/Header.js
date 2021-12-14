import React from 'react';
import { Link } from 'react-router-dom';

import GoogleAuth from './GoogleAuth';

//상단 바에 보이는 곳을
//Link 을 넣어서 그 마크를 눌렀을 때 그 장소로 넘어가게 만들었다.
const Header = () => {
  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="item">
        Streamy
      </Link>
      <div className="right menu">
        <Link to="/" className="item">
          All Streams
        </Link>
        <GoogleAuth />
      </div>
    </div>
  );
};

export default Header;
