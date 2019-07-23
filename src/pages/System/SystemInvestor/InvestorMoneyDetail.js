import React, { Component } from 'react'
import { Form, Button, Radio, Select, Table, Card, Row, Col} from 'antd'
import { connect } from 'dva'
import RadioGroup from 'antd/lib/radio/group';
import Yuan from '@/utils/Yuan'

const { Option } = Select;


@connect(({ system, loading}) => ({
  system,
  getDetails: loading.effects['system/getDetails']
}))
class InvestorMoneyDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortedInfo: null,
      // moneyBelow: 1000,
      details: []
    }
  }

  componentWillMount(){
     this.getMoneyDetails()
  }

  handleTypeChange = (e) => {
    const {system} = this.props;
    const newList = system.details.filter(v => (v.action === e.target.value))
    this.setState({
      details: newList
    })
  }

  // handleMoneyChange = (e) => {
  //   this.setState({
  //     moneyBelow: e
  //   })
  // }

  handleTableChange = (pagination, filters, sorter) => {
    this.setState({
      sortedInfo: sorter
    })
  }

  getMoneyDetails = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'system/getDetails'
    })
    const {system} = this.props;
    this.setState({
      details: system.details
    })
  }

  render() {
    const { details } = this.state;
    const {getDetails} = this.props;
    let {sortedInfo } = this.state;
    sortedInfo = sortedInfo || {};
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 8, offset: 5 },
    };
    // const buttonItemLayout = {
    //   wrapperCol: { span: 14, offset: 10 },
    // };
    const tableClomuns = [
      {
        title: '交易人姓名',
        dataIndex: 'realName',
        key: 'realName'
      },
      {
        title:'金额',
        dataIndex: 'amount',
        key: 'amount',
        sorter: (a, b) => a.money - b.money,
        sortOrder: sortedInfo.columnKey === 'money' && sortedInfo.order,
        render: (text) => {
          return <Yuan>{text}</Yuan>
        }
      },
      {
        title: '行为',
        dataIndex: 'action',
        key: 'action'
      },
      {
        title: '时间',
        dataIndex: 'time',
        key: 'time'
      },
      {
        title: '交易编号',
        dataIndex: 'tradeID',
        key: 'tradeID'
      },
      {
        title: '备注',
        dataIndex: 'remarks',
        key: 'remarks'
      }
    ]
    return (
      <div>
        <Form layout="inline">
          <Form.Item
            label="流动类型"
            {...formItemLayout}
          >
            <RadioGroup style={{width:200}} onChange={e => this.handleTypeChange(e)}>
              <Radio.Button value="存款">存款</Radio.Button>
              <Radio.Button value="取款">取款</Radio.Button>
              <Radio.Button value="交易">交易</Radio.Button>
            </RadioGroup>
          </Form.Item>
          {/* <Form.Item
            {...formItemLayout}
          >
            <Select
              showSearch
              style={{width:200}}
              placeholder="选择最大资金数"
              onChange={this.handleMoneyChange}
            >
              <Option value="20000"><Yuan>20000</Yuan></Option>
              <Option value="10000"><Yuan>10000</Yuan></Option>
              <Option value="5000"><Yuan>5000</Yuan></Option>
              <Option value="3000"><Yuan>3000</Yuan></Option>
              <Option value="1000"><Yuan>1000</Yuan></Option>
            </Select>
          </Form.Item>
          <Form.Item {...buttonItemLayout}>
            <Button type="primary" icon="search">查找</Button>
          </Form.Item> */}
        </Form>
        <Row gutter={8}>
          {details.map(item => (
            <Col xs={20} sm={16} md={12} lg={10} xl={6} style={{marginBottom: 10}}>
              <Card
                title={<span>{item.realName}</span>}
                extra={<span>{item.tradeID}</span>}
              >
                <Row type="flex" justify="start" style={{marginBottom: 30}}>
                  <Col span={8}>
                    <Yuan>{item.amount}</Yuan>
                  </Col>
                  <Col span={8}>
                    <span>{item.action}</span>
                  </Col>
                </Row>
                <Row type="flex" justify="start" style={{marginBottom: 30}}>
                  <Col span={16}>
                    {item.time}
                  </Col>
                </Row>
                <Row type="flex" justify="start" style={{marginBottom: 30}}>
                  <Col span={16}>
                    {item.remarks}
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>

        {/* <Table style={{background: '#ffffff', marginTop: 50}} columns={tableClomuns} dataSource={details} onChange={this.handleTableChange} loading={getDetails} /> */}
      </div>
    )
  }
}

export default InvestorMoneyDetail
