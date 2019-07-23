import React, { Component } from 'react'
import { Row, Col, Table, DatePicker, Card } from 'antd'
import { connect } from 'dva'
import Yuan from '@/utils/Yuan'

const { RangePicker } = DatePicker;

@connect(({ history, loading}) => ({
  history,
  getHistoryTrade: loading.effects['history/getHistoryTrade']
}))
class HistoryTrade extends Component {
  constructor(props){
    super(props);
    this.state = {
      columns : [
        {
          title: '交易编号',
          dataIndex: 'tradeID',
          key: 'tradeID'
        },
        {
          title: '账户编号',
          dataIndex: 'accountID',
          key: 'accountID'
        },
        {
          title: '交易方案编号',
          dataIndex: 'solutionID',
          key: 'solutionID'
        },
        {
          title: '对象',
          dataIndex: 'item',
          key: 'item'
        },
        {
          title: '头寸',
          dataIndex: 'position',
          key: 'position'
        },
        {
          title: '买/卖',
          dataIndex: 'direction',
          key: 'direction'
        },
        {
          title: '价格',
          dataIndex: 'price',
          key: 'income'
        },
        {
          title: '收入',
          dataIndex: 'income',
          key: 'income'
        },
        {
          title: '佣金',
          dataIndex: 'commission',
          key: 'commission'
        },
        {
          title: '时间',
          dataIndex: 'time',
          key: 'time'
        },
        {
          title: '备注',
          dataIndex: 'remark',
          key: 'remark'
        }
      ],
      tradeData: []
    }
  }

  componentWillMount() {
    this.getHistoryTradeData()
  }


  onChange = (date, dateString) => {
    this.getRangeData(dateString[0], dateString[1]);
  }

  getHistoryTradeData = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'history/getHistoryTrade'
    })
    const {history} = this.props;
    this.setState({
      tradeData: history.historyTrades
    })
  }

  getRangeData = (start, end) => {
    const { tradeData } = this.state;
    const newData = tradeData.filter( v => {
      const theTime = new Date(v.time);
      const startTime = new Date(start);
      const endTime = new Date(end);
      return theTime >= startTime && theTime <= endTime;
    })
    this.setState({
      tradeData: newData
    })
  }


  render() {
    const { getHistoryTrade } = this.props;
    const { columns, tradeData } = this.state;
    return (
      <div>
        <Row>
          <Col span={5}>选择时间段</Col>
          <Col xs={12} sm={10} md={8} lg={8} xl={8}>
            <RangePicker onChange={this.onChange} />
          </Col>
        </Row>
        <Row type="flex" justify="start" gutter={8}>
          {tradeData.map(item => (
            <Col xs={20} sm={16} md={12} lg={10} xl={6} style={{marginBottom: 10}}>
              <Card
                title={<span>{item.solutionID}</span>}
                extra={item.accountID}
              >
                <Row>
                  <Col span={8}>
                    <span>{item.item}</span>
                  </Col>
                  <Col span={8}>
                    <Yuan>{item.position}</Yuan>
                  </Col>
                  <Col span={8}>
                    <span>{item.direction}</span>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    <Yuan>{item.price}</Yuan>
                  </Col>
                  <Col span={8}>
                    <Yuan>{item.income}</Yuan>
                  </Col>
                  <Col span={8}>
                    <Yuan>{item.commission}</Yuan>
                  </Col>
                </Row>
                <Row>
                  <Col span={16}>
                    <span>{item.time}</span>
                  </Col>
                </Row>
                <Row>
                  <Col span={16}>
                    <span>{item.remarks}</span>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
        {/* <Table style={{background: '#fff', marginTop: 50}} columns={columns} dataSource={tradeData} loading={getHistoryTrade} /> */}

      </div>
    )
  }
}

export default HistoryTrade
