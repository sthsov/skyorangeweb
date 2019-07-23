import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={[
        {
          key: 'Sky Orange 首页',
          title: 'Sky Orange 首页',
          href: 'https://skyorange.com/',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <Icon type="github" />,
          href: 'https://github.com/Reaper622',
          blankTarget: true,
        },
        {
          key: 'Ant Design',
          title: '基于 Ant Design',
          href: 'https://ant.design',
          blankTarget: true,
        },
      ]}
      copyright={
        <Fragment>
          Copyright <Icon type="copyright" /> 2019 SKYORANGE.COM
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
