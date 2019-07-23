import React, { PureComponent } from 'react'
import {
  Form, Input, Button, Card,
} from 'antd';
import { connect } from 'dva'
// import styles from './InvestorManagement.less'

@connect()
class InvestorInfoManagement extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
        loginName: 'investor',
        password: 'skyorange',
        realName: 'skyorange',
        email: '12345678@email.com',
        phone: '12345678901',
        lastLoginTime: '2019-4-13'
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
    const  user  = this.state;
    return (
      <Card bordered={false}>
        <Form layout="horizontal">
          <Form.Item
            label="登录名"
            {...formItemLayout}
          >
            <Input value={user.loginName} disabled  />
          </Form.Item>
          <Form.Item
            label="密码"
            {...formItemLayout}
          >
            <Input value={user.password} onChange={e => this.changeState(e.target.value, 'password')} />
          </Form.Item>
          <Form.Item
            label="姓名"
            {...formItemLayout}
          >
            <Input value={user.realName} disabled  />
          </Form.Item>
          <Form.Item
            label="邮箱"
            {...formItemLayout}
          >
            <Input value={user.email} onChange={e => this.changeState(e.target.value, 'email')} />
          </Form.Item>
          <Form.Item
            label="手机"
            {...formItemLayout}
          >
            <Input value={user.phone} onChange={e => this.changeState(e.target.value, 'phone')} />
          </Form.Item>
          <Form.Item
            label="最后一次登录时间"
            {...formItemLayout}
          >
            <span>{user.lastLoginTime}</span>
          </Form.Item>
          <Form.Item {...buttonItemLayout}>
            <Button type="primary">提交修改</Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}

export default InvestorInfoManagement
