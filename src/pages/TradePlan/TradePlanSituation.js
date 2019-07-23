import React, { Component } from 'react'
import router from 'umi/router'
import Trend from '@/components/Trend'
import Yuan from '@/utils/Yuan'
import { Row, Col, Icon, Tooltip, Card, Table, Divider } from 'antd'
import numeral from 'numeral'
import { connect } from 'dva'
import { ChartCard, Field, WaterWave } from '@/components/Charts'
import styles from './TradePlanSituation.less'

@connect(({ plan, loading}) => ({
  plan,
  getPlan: loading.effects['plan/getPlans']
}))
class TradePlanSituation  extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: '交易方案编号',
          dataIndex: 'solutionID',
          key: 'solutionID'
        },
        {
          title: '交易方案名称',
          dataIndex: 'solutionName',
          key: 'solutionName'
        },
        {
          title: '状态',
          dataIndex: 'status',
          key: 'status',
          render: (text) => (
            <span>{text === 1? '通过' : '待评定'}</span>
          )
        },
        {
          title: '交易额',
          dataIndex: 'tradeMoney',
          key: 'tradeMoney',
          render: (text) => (
            <Yuan>{text}</Yuan>
          )
        },
        {
          title: '交易者',
          dataIndex: 'tradePerson',
          key: 'tradePerson'
        },
        {
          title: '操作',
          key: 'action',
          render: (text, item) => (
            <div>
              <span className={styles.linkItem} onClick={() => this.checkDetail(item.solutionID)}>查看详情</span>
              <Divider type="vertical" />
              <span className={styles.linkItem} onClick={() => this.desideDetail(item.solutionID)}>决策</span>
            </div>
          )
        }
      ]
    }
  }

  componentWillMount() {
    this.getTradePlan()
  }

  checkDetail = (id) => {
    router.push(`/tradeplan/${id}`);
  }

  desideDetail = (id) => {
    router.push(`/tradeplan/deside/${id}`)
  }

  getTradePlan = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'plan/getPlans'
    })
  }

  render() {
    const {plan, getPlan} = this.props;
    const {columns} = this.state;
    return (
      <div>
        <Row>
          <Col span={6}>
            <ChartCard
              title="交易额"
              action={
                <Tooltip title="资金说明">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total={() => <Yuan>123456</Yuan>}
              footer={
                <Field label="当日交易额" value={numeral(123465).format('0.0')} />
              }
              contentHeight={50}
              style={{height:200}}
            >
              <span>
                交易趋势
                <Trend flag="up" style={{marginLeft:8, color: "rgba(0,0,0,.85)"}}>
                  12%
                </Trend>
              </span>
            </ChartCard>
          </Col>
          <Col span={6} offset={2}>
            <Card style={{height: 200, textAlign: 'center'}}>
              <WaterWave
                height={150}
                title='交易资金剩余'
                percent={50}
              />
            </Card>
          </Col>
        </Row>
        <Table columns={columns} dataSource={plan.plans} style={{background: '#fff', marginTop: 50}} loading={getPlan} />
      </div>
    )
  }
}

export default TradePlanSituation
