import { Footer } from "@/components";
import { login } from "@/services/ant-design-pro/api";
import { getFakeCaptcha } from "@/services/ant-design-pro/login";
import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from "@ant-design/icons";
import {
  LoginForm,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from "@ant-design/pro-components";
import {
  FormattedMessage,
  Helmet,
  SelectLang,
  useIntl,
  useModel,
} from "@umijs/max";
import { Alert, App, Tabs } from "antd";
import { createStyles } from "antd-style";
import React, { useState } from "react";
import { flushSync } from "react-dom";
import Settings from "../../../../config/defaultSettings";

const useStyles = createStyles(({ token }) => {
  return {
    action: {
      marginLeft: "8px",
      color: "rgba(0, 0, 0, 0.2)",
      fontSize: "24px",
      verticalAlign: "middle",
      cursor: "pointer",
      transition: "color 0.3s",
      "&:hover": {
        color: token.colorPrimaryActive,
      },
    },
    lang: {
      width: 42,
      height: 42,
      lineHeight: "42px",
      position: "fixed",
      right: 16,
      borderRadius: token.borderRadius,
      ":hover": {
        backgroundColor: token.colorBgTextHover,
      },
    },
    container: {
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      overflow: "auto",
      backgroundImage: "url('/login-bg.webp')",
      backgroundSize: "100% 100%",
    },
    content: {
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center",
      gap: 48,
      minHeight: "calc(100vh - 120px)",
      padding: "48px 24px",
      boxSizing: "border-box",
      [`@media screen and (max-width: ${token.screenLG}px)`]: {
        flexDirection: "column",
        padding: "32px 16px",
      },
    },
    formPanel: {
      width: "100%",
      maxWidth: 460,
    },
    banner: {
      flex: 1,
      maxWidth: 540,
      textAlign: "center",
      [`@media screen and (max-width: ${token.screenLG}px)`]: {
        maxWidth: "100%",
      },
      img: {
        width: "100%",
        maxHeight: 480,
        objectFit: "contain",
        borderRadius: token.borderRadiusLG,
      },
    },
    border: {
      borderLeft: "1px solid rgb(215, 216, 216)",
      height: "40%",
    },
  };
});

const ActionIcons = () => {
  const { styles } = useStyles();

  return (
    <>
      <AlipayCircleOutlined
        key="AlipayCircleOutlined"
        className={styles.action}
      />
      <TaobaoCircleOutlined
        key="TaobaoCircleOutlined"
        className={styles.action}
      />
      <WeiboCircleOutlined
        key="WeiboCircleOutlined"
        className={styles.action}
      />
    </>
  );
};

const Lang = () => {
  const { styles } = useStyles();

  return (
    <div className={styles.lang} data-lang>
      {SelectLang && <SelectLang />}
    </div>
  );
};

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};

const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>("account");
  const { initialState, setInitialState } = useModel("@@initialState");
  const { styles } = useStyles();
  const { message } = App.useApp();
  const intl = useIntl();

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const msg = await login({ ...values, type });
      if (msg.status === "ok") {
        const defaultLoginSuccessMessage = intl.formatMessage({
          id: "pages.login.success",
          defaultMessage: "登录成功！",
        });
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        const urlParams = new URL(window.location.href).searchParams;
        window.location.href = urlParams.get("redirect") || "/";
        return;
      }
      console.log(msg);
      // 如果失败去设置用户错误信息
      setUserLoginState(msg);
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: "pages.login.failure",
        defaultMessage: "登录失败，请重试！",
      });
      console.log(error);
      message.error(defaultLoginFailureMessage);
    }
  };
  const { status, type: loginType } = userLoginState;

  return (
    <div className={styles.container}>
      <Helmet>
        <title>
          {intl.formatMessage({
            id: "menu.login",
            defaultMessage: "登录页",
          })}
          {Settings.title && ` - ${Settings.title}`}
        </title>
      </Helmet>
      <Lang />
      <div className={styles.content}>
        <div className={styles.formPanel}>
          <LoginForm
            contentStyle={{
              minWidth: 280,
              maxWidth: "100%",
            }}
            logo={<img alt="logo1" src="/logo.svg" />}
            subTitle={intl.formatMessage({
              id: "pages.layouts.userLayout.title",
            })}
            initialValues={{
              autoLogin: true,
              username: "admin",
              password: "ant.design",
            }}
            actions={[
              <FormattedMessage
                key="loginWith"
                id="pages.login.loginWith"
                defaultMessage="其他登录方式"
              />,
              <ActionIcons key="icons" />,
            ]}
            onFinish={async (values) => {
              await handleSubmit(values as API.LoginParams);
            }}
          >
            <Tabs
              activeKey={type}
              onChange={setType}
              centered
              items={[
                {
                  key: "account",
                  label: intl.formatMessage({
                    id: "pages.login.accountLogin.tab",
                    defaultMessage: "账户密码登录",
                  }),
                },
                {
                  key: "mobile",
                  label: intl.formatMessage({
                    id: "pages.login.phoneLogin.tab",
                    defaultMessage: "手机号登录",
                  }),
                },
              ]}
            />

            {status === "error" && loginType === "account" && (
              <LoginMessage
                content={intl.formatMessage({
                  id: "pages.login.accountLogin.errorMessage",
                  defaultMessage: "账户或密码错误(admin/ant.design)",
                })}
              />
            )}
            {type === "account" && (
              <>
                <ProFormText
                  name="username"
                  fieldProps={{
                    size: "large",
                    prefix: <UserOutlined />,
                  }}
                  placeholder={intl.formatMessage({
                    id: "pages.login.username.placeholder",
                    defaultMessage: "用户名: admin or user",
                  })}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.username.required"
                          defaultMessage="请输入用户名!"
                        />
                      ),
                    },
                  ]}
                />
                <ProFormText.Password
                  name="password"
                  fieldProps={{
                    size: "large",
                    prefix: <LockOutlined />,
                  }}
                  placeholder={intl.formatMessage({
                    id: "pages.login.password.placeholder",
                    defaultMessage: "密码: ant.design",
                  })}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.password.required"
                          defaultMessage="请输入密码！"
                        />
                      ),
                    },
                  ]}
                />
              </>
            )}

            {status === "error" && loginType === "mobile" && (
              <LoginMessage content="验证码错误" />
            )}
            {type === "mobile" && (
              <>
                <ProFormText
                  fieldProps={{
                    size: "large",
                    prefix: <MobileOutlined />,
                  }}
                  name="mobile"
                  placeholder={intl.formatMessage({
                    id: "pages.login.phoneNumber.placeholder",
                    defaultMessage: "手机号",
                  })}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.phoneNumber.required"
                          defaultMessage="请输入手机号！"
                        />
                      ),
                    },
                    {
                      pattern: /^1\d{10}$/,
                      message: (
                        <FormattedMessage
                          id="pages.login.phoneNumber.invalid"
                          defaultMessage="手机号格式错误！"
                        />
                      ),
                    },
                  ]}
                />
                <ProFormCaptcha
                  fieldProps={{
                    size: "large",
                    prefix: <LockOutlined />,
                  }}
                  captchaProps={{
                    size: "large",
                  }}
                  placeholder={intl.formatMessage({
                    id: "pages.login.captcha.placeholder",
                    defaultMessage: "请输入验证码",
                  })}
                  captchaTextRender={(timing, count) => {
                    if (timing) {
                      return `${count} ${intl.formatMessage({
                        id: "pages.getCaptchaSecondText",
                        defaultMessage: "获取验证码",
                      })}`;
                    }
                    return intl.formatMessage({
                      id: "pages.login.phoneLogin.getVerificationCode",
                      defaultMessage: "获取验证码",
                    });
                  }}
                  name="captcha"
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.captcha.required"
                          defaultMessage="请输入验证码！"
                        />
                      ),
                    },
                  ]}
                  onGetCaptcha={async (phone) => {
                    const result = await getFakeCaptcha({
                      phone,
                    });
                    if (!result) {
                      return;
                    }
                    message.success("获取验证码成功！验证码为：1234");
                  }}
                />
              </>
            )}
            <div
              style={{
                marginBottom: 24,
              }}
            >
              <ProFormCheckbox noStyle name="autoLogin">
                <FormattedMessage
                  id="pages.login.rememberMe"
                  defaultMessage="自动登录"
                />
              </ProFormCheckbox>
              <a
                style={{
                  float: "right",
                }}
              >
                <FormattedMessage
                  id="pages.login.forgotPassword"
                  defaultMessage="忘记密码"
                />
              </a>
            </div>
          </LoginForm>
        </div>
        <div className={styles.border}></div>
        <div className={styles.banner}>
          <img src="/login-img.png" alt="login banner" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
