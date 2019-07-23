import React, { Component } from 'react'
import { List, Icon, Card, Button } from 'antd'

// 初始化公告信息
const listData = [];
for (let i = 0; i < 23; i+= 1) {
  listData.push({
    id: i,
    title: `这是第${i}条分析`,
    description: `分析者: 管理员${i}`,
    content: `这是第${i}条分析的内容`
  })
}
// 定义图标组件
const IconText = ({type, text}) => (
  <span>
    <Icon type={type} style={{marginRight: 8}} />
    {text}
  </span>
)

class BulletinBoard extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            pageSize: 5
          }}
          dataSource={listData}
          renderItem={item => (
            <Card border={false} style={{marginTop: 20}}>
              <List.Item
                key={item.id}
                actions={[<IconText type="eye" text="123" />,<Button type="primary">查看详情</Button>]}
                extra={<img width={270} alt="ima" src="https://ss0.baidu.com/-Po3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=60b8e72a8901a18befeb144fae2e0761/8644ebf81a4c510f3295831c6e59252dd42aa567.jpg" />}
              >
                <List.Item.Meta
                  title={<span>{item.title}</span>}
                  description={item.description}
                />
                {item.content}
              </List.Item>
            </Card>
          )}
        />
      </div>
    )
  }
}

export default BulletinBoard
