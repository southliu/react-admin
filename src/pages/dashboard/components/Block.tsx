import { Card, Row, Col } from 'antd'

const data = [
  { title: '访问数', num: 2000, all: 15000 },
  { title: '充值数', num: 2000, all: 15000 },
  { title: '注册数', num: 2000, all: 15000 },
  { title: '成交数', num: 2000, all: 15000 },
]

function Block() {
  return (
    <Row gutter={16}>
      {
        data.map(item => (
          <Col key={item.title} span={6}>
            <Card
              title={item.title}
              extra={<div className="border border-green-200 w-20px text-center">月</div>}
            >
              <>
                <p>{ item.num }</p>
                <div className="flex align-center justify-between">
                  <span>总数：</span>
                  <span>{ item.all }</span>
                </div>
              </>
            </Card>
          </Col>
        ))
      }
    </Row>
  )
}

export default Block