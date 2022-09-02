import type { ILoginData } from "./model"
import type { FormProps } from 'antd'
import { Link } from "react-router-dom"
import { Form, Button, Input } from 'antd'
import { useState } from "react"
import { PASSWORD_RULE } from "@/utils/config"
import Logo from '@/assets/images/logo.png'

function Login() {
  const [loading, setLoading] = useState(false)

  /**
   * 处理登录
   * @param values - 表单数据
   */
  const handleFinish: FormProps['onFinish'] = async (values: ILoginData) => {
    console.log('handleFinish:', values)
  }

  /**
   * 处理失败
   * @param errors - 错误信息
   */
  const handleFinishFailed: FormProps['onFinishFailed'] = errors => {
    console.error('错误信息:', errors)
  }

  return (
    <>
      <div>Login</div>
      <Link to="/">to home</Link>

      <div className="bg-light-400 w-screen h-screen relative">
        <div className="
          box
          w-300px
          h-290px
          p-30px
          rounded-5px
          bg-white
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
        ">
         <div className="pb-30px pt-10px flex items-center justify-center">
            <img
              className="mr-2 object-contain"
              width="30"
              height="30"
              src={Logo}
              alt="LOGO"
            />
            <span className="text-xl font-bold tracking-2px">系统登录</span>
          </div>
          <Form
            name="horizontal_login"
            autoComplete="on"
            onFinish={handleFinish}
            onFinishFailed={handleFinishFailed}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input
                allow-clear="true"
                placeholder="用户名"
                data-test="username"
                auto-complete="username"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: '请输入密码' },
                PASSWORD_RULE
              ]}
            >
              <Input.Password
                placeholder="密码"
                allow-clear="true"
                data-test="password"
                auto-complete="current-password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                html-type="submit"
                className="w-full mt-5px rounded-5px tracking-2px"
                loading={loading}
                // disabled={formState.username === '' || formState.password.length < 6}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  )
}

export default Login