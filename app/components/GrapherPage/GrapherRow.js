var React = require('react');
import { Router, Route, Link } from 'react-router';

import {imgModifier} from '../Tools';

var deviceWidth = parseInt(window.innerWidth);

var GrapherRow = React.createClass({
  getDefaultProps: function() {
    return {
      data: {
       
      }
    };
  },
  
  render: function() {
    var grapherPageIntro = {
      height: deviceWidth/2
    };
    var nickStyle = {
      marginTop: -4*deviceWidth/375,
      marginBottom: 5*deviceWidth/375
    };
    var grapherSpliterLineStyle ={
      top: -5*deviceWidth/375
    };

    const rondomAvatar = '//user.file.aiyaopai.com/_randomAvatar/' + (parseInt(this.props.data.User.Id) % 47 + 1 ) + '.png';
    const grapherAvatar = imgModifier(this.props.data.User.Avatar||rondomAvatar, "grapherAvatar");

    
    return (
      <div className="grapherRow">
        <div className="grapherAvatar">
        <Link to={"/grapherDetail/"+this.props.data.Id} >
          <img 
            ref="avatar"
            src={grapherAvatar} />
        </Link>
        </div>
        <div className="grapherPageIntro" style={grapherPageIntro}>
          <div className="grapherIntroContainer">
            <div 
              ref="name">{this.props.data.RealName}</div>
            <div 
              style={nickStyle}
              ref="nick">{this.props.data.nick}</div>
            <img 
              style={{marginRight:6}}
              ref="locationIcon"
              src="imgs/grapherPage/location-icon.png"
              srcSet="imgs/grapherPage/location-icon@2X.png 2x" />
            <span
              ref="location">{this.props.data.CityName}</span>     
            <img 
              ref="grapherSpliterLine"
              style={grapherSpliterLineStyle}
              src="imgs/grapherPage/grapher-spliter-line.png"
              srcSet="imgs/grapherPage/grapher-spliter-line@2X.png 2x" />     
            <Link to={"/work_book_page/0/"+this.props.data.Id} >  
              <button ref="grapherBook">预约</button>
            </Link> 
          </div>
        </div>
      </div>
    );
  }
});

module.exports = GrapherRow;