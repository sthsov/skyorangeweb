import React, { Component } from 'react'
import {Row, Col, Statistic, Card, List, Avatar} from 'antd'
import Yuan from '@/utils/Yuan'

const fakeAvatarUrl = "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1554379058&di=04c565d8258a79cba4e827425e60f6bc&src=http://img.zcool.cn/community/01a3865ab91314a8012062e3c38ff6.png@1280w_1l_2o_100sh.png"
const { Item } = List;

const listData = [
  {id:1, name: '张三', direction:'投资投资投资投资投资投资投资投资', money: 1000},
  {id:2, name: '刘能', direction:'投资投资投资投资投资投资投资投资投资', money: 2000},
  {id:3, name: '李四', direction:'投资投资投资投资投资', money: 3000},
  {id:4, name: '张三', direction:'投资投资投资投资投资投资投资投资投资投资', money: 4000},
  {id:5, name: '王五', direction:'投资投资投资投资投资投资投资投资投资投资投资投资', money: 3000},
  {id:6, name: '张三', direction:'投资投资投资投资投资投资投资投资', money: 1000},
  {id:7, name: '刘能', direction:'投资投资投资投资投资投资投资投资投资', money: 2000},
  {id:8, name: '李四', direction:'投资投资投资投资投资', money: 3000},
  {id:9, name: '张三', direction:'投资投资投资投资投资投资投资投资投资投资', money: 4000},
  {id:10, name: '王五', direction:'投资投资投资投资投资投资投资投资投资投资投资投资', money: 3000}
]

class WithDrawals extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div>
        <Row gutter={16}>
          <Col span={4}>
            <Card>
              <Statistic title="待处理审批数" value={10} />
            </Card>
          </Col>
          <Col span={4}>
            <Card>
              <Statistic title="待处理提款总额" value={123} />
            </Card>
          </Col>
        </Row>
        <List
          itemLayout="horizontal"
          style={{marginTop: 50, background: '#fff'}}
        >
          {listData.map(item => (
            <Item
              key={item.id}
              actions={[<a>同意</a>, <a>拒绝</a>]}
            >
              <Item.Meta
                avatar={<Avatar src={fakeAvatarUrl} />}
                title={item.name}
                description={item.direction}
              />
              <Yuan>{item.money}</Yuan>
            </Item>
          ))}
        </List>
      </div>
    )
  }
}

export default WithDrawals
