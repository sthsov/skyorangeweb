import React, { Component } from 'react'
import { List, Icon, Card, Button } from 'antd'

// 初始化公告信息
const listData = [];
for (let i = 0; i < 23; i+= 1) {
  listData.push({
    id: i,
    title: `这是第${i}条公告`,
    description: `这是第${i}条公告，可以点击下面按钮查看详情`,
    content: `这是第${i}条公告的内容这是第${i}条公告的内容这是第${i}条公告的内容这是第${i}条公告的内容这是第${i}条公告的内容这是第${i}条公告的内容这是第${i}条公告的内容这是第${i}条公告的内容这是第${i}条公告的内容这是第${i}条公告的内容这是第${i}条公告的内容这是第${i}条公告的内容这是第${i}条公告的内容这是第${i}条公告的内容这是第${i}条公告的内容这是第${i}条公告的内容这是第${i}条公告的内容这是第${i}条公告的内容`
  })
}
// 定义图标组件
const IconText = ({type, text}) => (
  <span>
    <Icon type={type} style={{marginRight: 8}} />
    {text}
  </span>
)

class BulletinBoardManagement extends Component {
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
            <Card border={false}>
              <List.Item
                key={item.id}
                actions={[<span>上次编辑:</span>,<IconText type="clock-circle" text="2019/4/3" />,<Button type="primary" icon="edit">编辑</Button>]}
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

export default BulletinBoardManagement
