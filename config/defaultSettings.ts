import type { ProLayoutProps } from "@ant-design/pro-components";

/**
 * @name
 */
const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: "light",
  colorPrimary: "#1890ff",
  layout: "side",
  contentWidth: "Fluid",
  fixedHeader: true,
  fixSiderbar: true,
  colorWeak: false,
  footerRender: false,
  title: "开亚下单操作平台",
  pwa: true,
  logo: "/logo.svg",
  iconfontUrl: "",
  token: {
    // 参见ts声明，demo 见文档，通过token 修改样式
    //https://procomponents.ant.design/components/layout
    sider: {
      colorMenuBackground: "#233044ff",
      colorTextMenu: "rgba(238, 238, 238, 0.7)",
      colorTextMenuSelected: "rgb(238, 238, 238)",
      colorTextMenuItemHover: "rgb(238, 238, 238)",
      colorBgMenuItemHover: "rgba(0, 0, 0, 0.08)",
      colorBgMenuItemSelected: "rgb(30, 41, 58)",
    },
    header: {

    },
  },
};

export default Settings;
