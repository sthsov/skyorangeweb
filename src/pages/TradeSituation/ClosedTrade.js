import React, { Component } from 'react'
import { connect } from 'dva';
import { Table } from 'antd';

@connect(({ trade, loading }) => ({
  trade,
  getData: loading.effects['trade/getClosedTrade'],
}))

class TradeSituationDetail extends Component {
  constructor(props){
    super(props);
    this.state = {
      columns : [
        {
          title: '货币对',
          dataIndex: 'item',
          key: 'item'
        },
        {
          title: '类型',
          dataIndex: 'type',
          key: 'type',
        },
        {
          title: '买/卖',
          dataIndex: 'direction',
          key: 'direction',
        },
        {
          title: '交易价格',
          dataIndex: 'price',
          key: 'price',
        },
        {
          title: '仓位',
          dataIndex: 'openPosition',
          key: 'openPosition',
        },
        {
          title: '交易时间',
          dataIndex: 'orderTime',
          key: 'orderTime',
        },
        {
          title: '持有时间',
          dataIndex: 'holdTime',
          key: 'holdTime',
        },
        {
          title: '盈亏',
          dataIndex: 'income',
          key: 'income',
        },
        {
          title: '佣金',
          dataIndex: 'commission',
          key: 'commission',
        },
        {
          title: '方案序号',
          dataIndex: 'solutionID',
          key: 'solutionID',
        },
        {
          title: '子序号',
          dataIndex: 'solutionBeanSerial',
          key: 'solutionBeanSerial',
        },
      ]
    }
  }

  componentWillMount(){
    this.getClosedTrade();
  }

  componentDidMount(){
    setInterval(() => {
      this.getOpeningTrade();
    }, 180000);
  }


  getClosedTrade = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'trade/getClosedTrade',
    })
  }

  render() {
    const { columns } = this.state;
    const { trade, getData } = this.props;

    return (
        <div><Table dataSource={trade.closedTrade} columns={columns} style={{background:'#fff'}} loading={getData} pagination={{pageSize:20}} bordered={true} /></div>
    )
  }
  
}


export default TradeSituationDetail