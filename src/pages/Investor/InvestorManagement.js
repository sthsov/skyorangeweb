import React, { PureComponent } from 'react'
import {
  Form, Input, Button, Card
} from 'antd';
import { connect } from 'dva'
// import styles from './InvestorManagement.less'

@connect()
class InvestorManagement extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
      benchmark: '',
      current: '',
      net: '',
      margin: ''
    }
  }

  changeState = (value, index) => {
    this.setState({
      [index]: value
    })
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    };
    const buttonItemLayout ={
      wrapperCol: { span: 14, offset: 4 },
    };

    const application = this.state;
    return (
      <Card bordered={false}>
        <Form layout="horizontal">
          <Form.Item
            label="基准值"
            {...formItemLayout}
          >
            <Input placeholder="输入提款基准值" value={application.benchmark} onChange={e => this.changeState(e.target.value, 'benchmark')}  />
          </Form.Item>
          <Form.Item
            label="现值"
            {...formItemLayout}
          >
            <Input placeholder="输入提款现值" value={application.current} onChange={e => this.changeState(e.target.value, 'current')} />
          </Form.Item>
          <Form.Item
            label="净值"
            {...formItemLayout}
          >
            <Input placeholder="输入提款净值" value={application.net} onChange={e => this.changeState(e.target.value, 'net')} />
          </Form.Item>
          <Form.Item
            label="保证金"
            {...formItemLayout}
          >
            <Input placeholder="输入提款保证金" value={application.margin} onChange={e => this.changeState(e.target.value, 'margin')} />
          </Form.Item>
          <Form.Item {...buttonItemLayout}>
            <Button type="primary">提交申请</Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}

export default InvestorManagement
