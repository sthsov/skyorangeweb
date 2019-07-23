import React, { Component } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Checkbox, Alert, Icon } from 'antd';
import Login from '@/components/Login';
import styles from './Login.less';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

@connect(({login, loading}) => ({
  login,
  submitting: loading.effects['login/login']
}))
class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
  };

  // 改变登录者
  onTabChange = type => {
    this.setState({ type });
  }

  // 改变是否自动登录
  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  handleSubmit = (err, values) => {
    const { type } = this.state;
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'login/login',
        payload: {
          ...values,
          type
        }
      })
    }
  }

  renderMessage = content => (
    <Alert style={{marginBottom: 24}} message={content} type="error" showIcon />
  );

  render() {
    const { login, submitting } = this.props;
    const { type, autoLogin } = this.state;
    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form;
          }}
        >
          <Tab key="account" tab="账户登录">
            {login.status === 'error' &&
                login.type === 'account' &&
                !submitting &&
                this.renderMessage('无效的信息')}
            <UserName
              name="userName"
              placeholder="investor trader shareholder admin"
              rules={[
                {
                  required: true,
                  message: '用户名为必须',
                },
              ]}
            />
            <Password
              name="password"
              placeholder='密码 skyorange'
              rules={[
                {
                  required: true,
                  message: '密码为必须',
                },
              ]}
              onPressEnter={e => {
                e.preventDefault();
                this.loginForm.validateFields(this.handleSubmit);
              }}
            />
          </Tab>
          <Tab key="mobile" tab='手机登录'>
            <Mobile
              name="mobile"
              placeholder="输入手机号码"
              rules={[
                {
                  required: true,
                  message: '手机号码为必须',
                },
                {
                  pattern: /^1\d{10}$/,
                  message: '不符合格式',
                },
              ]}
            />
            <Captcha
              name="captcha"
              placeholder='输入验证码'
              countDown={120}
              onGetCaptcha={this.onGetCaptcha}
              getCaptchaButtonText='获取验证码'
              getCaptchaSecondText='已发送'
              rules={[
                {
                  required: true,
                  message: '验证码为必须',
                },
              ]}
            />
          </Tab>
          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              <span>自动登录</span>
            </Checkbox>
            <a style={{ float: 'right' }} href="">
              <span>忘记密码</span>
            </a>
          </div>
          <Submit loading={submitting}>
            <span>提交</span>
          </Submit>
          <div className={styles.other}>
            <Link className={styles.register} to="/user/register">
              <span>注册</span>
            </Link>
          </div>
        </Login>
      </div>
    )
  }
}

export default LoginPage
