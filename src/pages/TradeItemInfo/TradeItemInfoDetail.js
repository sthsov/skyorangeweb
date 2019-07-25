import React, { Component } from 'react'
import router from 'umi/router'
import Yuan from '@/utils/Yuan'
import { Table, Card, Row, Col, Divider, Tabs, Spin } from 'antd'
import { connect } from 'dva';

import styles from './TradeItemInfoDetail.less'
import { delay } from 'q';


@connect(({ trade, loading }) => ({
  trade,
  getData: loading.effects['trade/getTradeItems'],
}))
class TradeItemInfoDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: '货币对',
          dataIndex: 'chineseName',
          key: 'chineseName'
        },
        {
          title: '买价',
          dataIndex: 'buyRate',
          key: 'buyRate'
        },
        {
          title: '卖价',
          dataIndex: 'sellRate',
          key: 'sellRate'
        },
        {
          title: '最高',
          dataIndex: 'dayHigh',
          key: 'dayHigh'
        },
        {
          title: '最低',
          dataIndex: 'dayLow',
          key: 'dayLow'
        },
        {
          title: '敞口头寸',
          dataIndex: 'position',
          key: 'position',
        },
        {
          title: '头寸均价',
          dataIndex: 'avgPrice',
          key: 'avgPrice',
        },
        {
          title: '浮亏/盈',
          dataIndex: 'floating',
          key: 'floating',
        },
      ]
    }
  }

  componentWillMount() {
    this.getTradeData();
  }

  componentDidMount() {
    setInterval(() => {
      this.getTradeData();
    }, 16000);
  }

  getTradeData = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'trade/getTradeItems',
    })
  }

  checkDetail = (itemName) => {
    router.push(`/tradeitem/detail/${itemName}`)
  }

  render() {
    const { columns } = this.state;
    const { trade, getData } = this.props;
    const { TabPane } = Tabs;

    return (
      <div>
        <Tabs defaultActiveKey="1">
          <TabPane tab="表格式明细" key="1">
            <Table dataSource={trade.tradeItems} columns={columns} style={{ background: '#fff' }} loading={getData} pagination={{ pageSize: 50 }} bordered={true} Spin={{}} />
          </TabPane>
          <TabPane tab="卡片式明细" key="2">
            <Row type="flex" justify="space-around">
              {trade.tradeItems.map(item => (
                <Col xs={20} sm={16} md={12} lg={10} xl={6} style={{ marginBottom: 10 }}>
                  <Card
                    title={<span className={styles.linkItem} onClick={() => this.checkDetail(item.name)}>{item.chineseName}</span>}
                    extra={<div>{'买：' + item.buyRate}<Divider type="vertical" />{'卖：' + item.sellRate}</div>}
                  >
                    <Row type="flex" justify="start" style={{ marginBottom: 30 }}>
                      <Col span={8}>
                        {item.dayLow}
                      </Col>
                      <Col span={8}>
                        {item.dayHigh}
                      </Col>
                      <Col span={8}>
                        {/*item.floating*/}0
                      </Col>
                    </Row>
                    <Row type="flex" justify="start">
                      <Col span={8}>
                        {item.position}
                      </Col>
                      <Col span={8}>
                        {item.avgPrice}
                      </Col>
                    </Row>
                  </Card>
                </Col>
              ))}
            </Row>
          </TabPane>
        </Tabs>



      </div>
    )
  }
}

export default TradeItemInfoDetail
