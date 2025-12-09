import type { ProLayoutProps } from '@ant-design/pro-components';

/**
 * @name
 */
const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  colorPrimary: '#155DFB',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: true,
  colorWeak: false,
  footerRender: false,
  title: '开亚OMS下单操作平台',
  pwa: true,
  logo: '/logo.svg',
  iconfontUrl: '',
  token: {
    // 参见ts声明，demo 见文档，通过token 修改样式
    //https://procomponents.ant.design/components/layout
    sider: {
      colorMenuBackground: '#001529',
      colorTextMenu: 'rgba(238, 238, 238, 0.7)',
      colorTextMenuSelected: 'rgb(238, 238, 238)',
      colorTextMenuItemHover: 'rgb(238, 238, 238)',
      colorBgMenuItemHover: 'rgba(0, 0, 0, 0.08)',
      colorBgMenuItemSelected: '#155DFB',
    },
    header: {
      colorBgHeader: '#001529',
      colorHeaderTitle: 'rgba(255, 255, 255)',
      colorTextRightActionsItem: 'rgba(255, 255, 255, 0.7)',
      colorBgRightActionsItemHover: 'rgba(255, 255,255, 0.1)',
      heightLayoutHeader: 64,
    },
  },
};

export default Settings;
