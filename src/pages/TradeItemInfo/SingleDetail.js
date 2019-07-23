import React, { Component } from 'react'
import { async } from 'q';
import fetch from 'dva/fetch';
import { bool } from 'prop-types';
import { setOneItemIndicatorEchart, setLineGraphEchart } from '@/utils/chart';
import { Button, Radio } from 'antd';

class SingleDetail extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  

  componentWillMount() {
  }

  componentDidMount(){
    const {match} = this.props;
    const item = match.params.id;
    
    setOneItemIndicatorEchart(item);
  }

  
  render() {
    return (
      <div>
        <div id="indicatorChartDiv" style={{height: 750, width:1100}}></div>
        <div id="lineRadio" style={{width:800}}>
          <Radio.Group buttonStyle="solid" onChange={(e) => setLineGraphEchart(e.target.value)}>
            <Radio.Button value="M1">M1</Radio.Button>
            <Radio.Button value="M5">M5</Radio.Button>
            <Radio.Button value="M10">M10</Radio.Button>
            <Radio.Button value="M15">M15</Radio.Button>
            <Radio.Button value="M30">M30</Radio.Button>
            <Radio.Button value="H1">H1</Radio.Button>
            <Radio.Button value="H2">H2</Radio.Button>
            <Radio.Button value="H3">H3</Radio.Button>
            <Radio.Button value="H4">H4</Radio.Button>
            <Radio.Button value="H6">H6</Radio.Button>
            <Radio.Button value="H8">H8</Radio.Button>
            <Radio.Button value="D1">DAY</Radio.Button>
            <Radio.Button value="W1">WEEK</Radio.Button>
            <Radio.Button value="MONTH">MONTH</Radio.Button>
          </Radio.Group>
        </div>
        <div id="lineChartDiv" style={{height: 1200, width:1100}}></div>
      </div>
    );
  }
}

export default SingleDetail
