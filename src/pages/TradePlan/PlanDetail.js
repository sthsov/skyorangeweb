import React, { Component } from 'react'
import { connect } from 'dva'
import Yuan from '@/utils/Yuan'
import { Row, Col, Icon, Tooltip } from 'antd'
import numeral from 'numeral'
import { ChartCard, Field } from '@/components/Charts'

@connect(({plan, loading}) => ({
  plan,
  getDetail: loading.effects['plan/getPlans']
}))
class PlanDetail extends Component {
  constructor(props){
    super(props);
    this.state = {
      info : {},
    }
  }

  componentWillMount() {
    this.getData()
  }

  getData = () => {
    const {match, plan} = this.props;
    const toPlan = plan.plans;
    const matchPlan = toPlan.filter( v => {
        const theID = v.solutionID
        // eslint-disable-next-line radix
        const wantedID = parseInt(match.params.id)
        return theID === wantedID
      }
    )
    const theInfo = matchPlan[0];
    this.setState({
      info: theInfo
    })

  }

  render() {
    const {info} = this.state;
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
              total={() => <Yuan>{info.tradeMoney}</Yuan>}
              footer={
                <Field label="当日交易额" value={numeral(info.tradeMoney).format('0.0')} />
              }
              contentHeight={50}
              style={{height:200}}
            >
              <span>
                交易人: {info.tradePerson}
              </span>
            </ChartCard>
          </Col>
        </Row>
      </div>
    )
  }
}

export default PlanDetail
