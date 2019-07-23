import React, { Component } from 'react'
import PageHeader from '@/components/PageHeader'
import { Card, Icon, Avatar, Row, Col } from 'antd'
import { connect } from 'dva'

const {Meta} = Card;


const HeaderContent = (
  <div>
    <p>投资者信息管理平台</p>
  </div>
)

const extra = (
  <div className="imgContainer">
    <img style={{ width: 200 }} alt="" src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png" />
  </div>
);


const fakeAvatarUrl = "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1554379058&di=04c565d8258a79cba4e827425e60f6bc&src=http://img.zcool.cn/community/01a3865ab91314a8012062e3c38ff6.png@1280w_1l_2o_100sh.png"

@connect(({system, loading}) => ({
  system,
  getUser: loading.effects['system/getUserList']
}))
class InvestorInfoManagement extends Component{
  constructor(props){
    super(props);
    this.state = {}
  }

  componentWillMount(){
    this.getUsers()
  }

  getUsers = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'system/getUserList'
    })

  }

  render() {
    const {system, getUser} = this.props;
    return (
      <div>
        <PageHeader
          title="信息管理"
          content={HeaderContent}
          extraContent={extra}
        />
        <Row gutter={16} loading={getUser}>
          {system.userList.map(item => (
            <Col span={6}>
              <Card
                key={item.loginName}
                style={{marginTop: 10}}
                actions={[<Icon type="setting" />, <Icon type="ellipsis" />]}
                hoverable
              >
                <Meta
                  avatar={<Avatar src={fakeAvatarUrl} />}
                  title={item.realName}
                  description={`上次登陆时间: ${item.lastLoginTime}`}
                  style={{marginBottom:10}}
                />
                <p>邮箱:{item.email}</p>
                <p>电话号码:{item.phone}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    )
  }
}

export default InvestorInfoManagement
