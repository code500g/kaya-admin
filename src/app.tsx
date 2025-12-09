import { BellOutlined, MoreOutlined } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { SettingDrawer } from '@ant-design/pro-components';
import { AvatarDropdown, AvatarName, Footer } from '@/components';
import { currentUser as queryCurrentUser } from '@/services/ant-design-pro/api';
import '@ant-design/v5-patch-for-react-19';
import type { RequestConfig, RunTimeLayoutConfig } from '@umijs/max';
import { history } from '@umijs/max';
import { Badge, Dropdown, Grid } from 'antd';
import React, { useEffect, useState } from 'react';
import defaultSettings from '../config/defaultSettings';
import { errorConfig } from './requestErrorConfig';

const isDev = process.env.NODE_ENV === 'development' || process.env.CI;
const loginPath = '/user/login';

type TimezoneClockProps = {
  fontSize?: number;
  gap?: number;
};

const TimezoneClock: React.FC<TimezoneClockProps> = ({
  fontSize = 14,
  gap = 12,
}) => {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (timeZone: string) =>
    new Intl.DateTimeFormat('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone,
    }).format(now);

  const zones = [
    {
      label: '美东时区',
      warehouse: '纽约仓',
      tz: 'America/New_York',
      hour: -13,
    },
    {
      label: '美中时区',
      warehouse: '芝加哥仓',
      tz: 'America/Chicago',
      hour: -14,
    },
    {
      label: '美西时区',
      warehouse: '洛杉矶仓',
      tz: 'America/Los_Angeles',
      hour: -16,
    },
  ];

  return (
    <div className="header-timezones" style={{ gap, fontSize }}>
      <span className="timezones-title">世界时间：</span>
      <div className="timezones" style={{ gap }}>
        {zones.map((zone) => (
          <div key={zone.tz}>
            <span className="label" style={{ gap }}>
              <span>
                {zone.label}({zone.hour}h)
              </span>
              <span className="tz">{formatTime(zone.tz)}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const HeaderActions: React.FC = () => {
  const screens = Grid.useBreakpoint();
  const isCompact = !screens.xxl; // xl 及以下
  const showDropdown = !screens.lg; // md 及以下折叠成 icon

  const fontSize = isCompact ? 12 : 14;
  const gap = isCompact ? 8 : 12;

  const accountInfo = (
    <div
      key="account-info"
      className="header-account-info"
      style={{ display: 'flex', gap, fontSize }}
    >
      <span>邀请码: Nii55VFb</span>
      <span>公司编码: YWS23100802</span>
    </div>
  );

  const tz = <TimezoneClock key="tz" fontSize={fontSize} gap={gap} />;

  if (showDropdown) {
    return [
      <Dropdown
        key="header-dropdown"
        placement="bottomRight"
        menu={{
          items: [
            { key: 'tz', label: tz },
            { key: 'account', label: accountInfo },
          ],
        }}
      >
        <MoreOutlined style={{ fontSize: 18 }} />
      </Dropdown>,
      <Badge
        key="msg"
        size="small"
        count={5}
        offset={[-5, 6]}
        color={'#155DFB'}
        className="header-badge"
      >
        <BellOutlined
          style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: 18 }}
        />
      </Badge>,
      // <QuestionCircleOutlined key="doc" />,
      // <SelectLang key="SelectLang" />,
    ];
  }

  return [
    tz,
    accountInfo,
    <Badge
      size="small"
      count={5}
      color={'#155DFB'}
      className="header-badge"
      key="msg"
      offset={[-5, 6]}
    >
      <BellOutlined
        style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: 18 }}
      />
    </Badge>,
    // <QuestionCircleOutlined key="doc" />,
    // <SelectLang key="SelectLang" />,
  ];
};

/**
 * @see https://umijs.org/docs/api/runtime-config#getinitialstate
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser({
        skipErrorHandler: true,
      });
      return msg.data;
    } catch (_error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果不是登录页面，执行
  const { location } = history;
  if (
    ![loginPath, '/user/register', '/user/register-result'].includes(
      location.pathname,
    )
  ) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings as Partial<LayoutSettings>,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({
  initialState,
  setInitialState,
}) => {
  return {
    headerContentRender: () => [],
    actionsRender: () => [<HeaderActions key="header-actions" />],
    avatarProps: {
      src: initialState?.currentUser?.avatar,
      title: <AvatarName />,
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },
    // waterMarkProps: {
    //   content: initialState?.currentUser?.name,
    // },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    bgLayoutImgList: [
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
        left: 85,
        bottom: 100,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
        bottom: -68,
        right: -45,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    // 统一面包屑：前置首页，其余沿用路由生成的层级
    breadcrumbRender: (routers = []) => [
      { path: '/', breadcrumbName: '首页' },
      ...routers.filter((r) => r.path !== '/'),
    ],
    // 自定义 logo 区域：可手动控制图片大小和样式
    // menuHeaderRender: () => (
    //   <div id="logo" className="custom-logo">
    //     <img src={defaultSettings.logo || "/logo.svg"} alt="logo" />
    //     <div className="custom-title">开亚下单操作平台</div>
    //   </div>
    // ),
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {isDev && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request: RequestConfig = {
  //  baseURL: "https://proapi.azurewebsites.net",
  baseURL: 'http://localhost:8000',
  ...errorConfig,
};
