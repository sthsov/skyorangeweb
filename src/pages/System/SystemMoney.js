import React, { Component, Suspense } from 'react'
import { ChartCard, Field, Pie, Bar } from '@/components/Charts'
import Trend from '@/components/Trend'
import Yuan from '@/utils/Yuan'
import { Row, Col, Icon, Tooltip, Card } from 'antd'
import numeral from 'numeral'
import GridContent from '@/components/PageHeaderWrapper/GridContent'
import { connect } from 'dva'
import styles from './SystemMoney.less'
import PageLoading from '@/components/PageLoading';

// 生成柱状图的随机数据
const salesData = [];
for (let i = 0; i <= 12; i += 1) {
  salesData.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random()*1000) + 200,
  });
}

@connect()
class SystemMoney extends Component {
  state = {
    pieData: [
      {
        x: '净值',
        y: 1000
      },
      {
        x: '浮亏',
        y: 500
      }
    ]
  };

  render() {
    const {pieData} = this.state
    return (
      <GridContent>
        <Row className={styles.row}>
          <Col span={8}>
            <Suspense fallback={<PageLoading />}>
              <ChartCard
                title="资金总额"
                action={
                  <Tooltip title="资金说明">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
                total={() => <Yuan>126560</Yuan>}
                footer={
                  <Field label="当日资金交易额" value={numeral(123456).format("0.0")} />
                }
                contentHeight={46}
              >
                <span>
                  收入
                  <Trend flag="up" style={{marginLeft:8, color: "rgba(0,0,0,.85)"}}>
                    12%
                  </Trend>
                </span>
                <span>
                  支出
                  <Trend flag="down" style={{marginLeft:8, color: "rgba(0,0,0,.85)"}}>
                    12%
                  </Trend>
                </span>
              </ChartCard>
            </Suspense>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Suspense fallback={<PageLoading />}>
              <Card
                className={styles.salesCard}
                style={{paddingTop: 0}}
              >
                <Pie
                  hasLegend
                  title="饼图"
                  subTitle="饼图"
                  total={<Yuan>{pieData.reduce((pre, now) => now.y + pre, 0)}</Yuan>}
                  data={pieData}
                  valueFormat={value => <Yuan>{value}</Yuan>}
                  width={50}
                  heigth={50}
                  lineWidth={3}
                  style={{top: -20}}
                />
              </Card>
            </Suspense>
          </Col>
        </Row>
        <Row className={styles.row}>
          <Col>
            <Card>
              <Bar
                height={200}
                title="柱状图"
                data={salesData}
              />
            </Card>
          </Col>
        </Row>
      </GridContent>
    )
  }
}

export default SystemMoney
