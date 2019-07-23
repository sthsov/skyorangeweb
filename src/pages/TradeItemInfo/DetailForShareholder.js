import React, { Component } from 'react'

import router from 'umi/router'
import { Table } from 'antd'
import { connect } from 'dva';



@connect(({ trade, loading}) => ({
  trade,
  getData: loading.effects['trade/getTradeItems'],
}))
class DetailForShareholder extends Component {
  constructor(props){
    super(props);
    this.state = {
     columns : [
        {
          title: '对象名称',
          dataIndex: 'item',
          key: 'item'
        },
        {
          title: '买价',
          dataIndex: 'ask',
          key: 'ask'
        },
        {
          title: '卖价',
          dataIndex: 'bid',
          key: 'bid'
        },
        {
          title: '最高',
          dataIndex: 'high',
          key: 'high'
        },
        {
          title: '最低',
          dataIndex: 'low',
          key: 'low'
        }
      ]
    }
  }

  componentWillMount(){
    this.getTradeData()
  }

  getTradeData = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'trade/getTradeItems',
    })
  }

  checkDetail = (id) => {
    router.push(`/tradeitem/detail/${id}`)
  }

  render() {
    const {columns} = this.state;
    const {trade, getData} = this.props;
    return (
      <div>
        <Table dataSource={trade.tradeItems} columns={columns} style={{background:'#fff'}} loading={getData} />
      </div>
    )
  }
}
export default DetailForShareholder
