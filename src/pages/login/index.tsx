import type { ILoginData } from './model'
import type { FormProps } from 'antd'
import type { AppDispatch, RootState } from '@/stores'
import type { IThemeType } from '@/stores/public'
import { message } from 'antd'
import { Form, Button, Input } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { PASSWORD_RULE, THEME_KEY } from '@/utils/config'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { login } from '@/servers/login'
import { useTitle } from '@/hooks/useTitle'
import { useToken } from '@/hooks/useToken'
import { setThemeValue } from '@/stores/public'
import { permissionsToArray } from '@/utils/permissions'
import { setPermissions, setUserInfo } from '@/stores/user'
import { getPermissions } from '@/servers/permissions'
import { getFirstMenu } from '@/menus/utils/helper'
import { defaultMenus } from '@/menus'
import Logo from '@/assets/images/logo.svg'

function Login() {
  useTitle('登录')
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()
  const [getToken, setToken] = useToken()
  const [isLoading, setLoading] = useState(false)
  const permissions = useSelector((state: RootState) => state.user.permissions)
  const themeCache = (localStorage.getItem(THEME_KEY) || 'light') as IThemeType

  useEffect(() => {
    if (!themeCache) {
      localStorage.setItem(THEME_KEY, 'light')
    }
    if (themeCache === 'dark') {
      document.body.className = 'theme-dark'
    }
    dispatch(setThemeValue(themeCache === 'dark' ? 'dark' : 'light'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themeCache])

  useEffect(() => {
    // 如果存在token，则直接进入页面
    if (getToken()) {
      // 如果不存在缓存则获取权限
      if (!permissions.length) {
        getUserPermissions()
      } else {
        // 有权限则直接跳转
        const firstMenu = getFirstMenu(defaultMenus, permissions)
        navigate(firstMenu)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /** 获取用户权限 */
  const getUserPermissions = async () => {
    try {
      setLoading(true)
       const { data } = await getPermissions({ refresh_cache: false })
       if (data) {
          const { data: { user, permissions } } = data
          const newPermissions = permissionsToArray(permissions)
          const firstMenu = getFirstMenu(defaultMenus, newPermissions)
          dispatch(setUserInfo(user))
          dispatch(setPermissions(newPermissions))
          navigate(firstMenu)
       }
    } finally {
      setLoading(false)
    }
  }

  /**
   * 处理登录
   * @param values - 表单数据
   */
  const handleFinish: FormProps['onFinish'] = async (values: ILoginData) => {
    try {
      setLoading(true)
      const { data } = await login(values)
      const { data: { token, user, permissions } } = data

      if (!permissions?.length || !token) {
        return message.error({ content: '用户暂无权限登录', key: 'permissions' })
      }

      const newPermissions = permissionsToArray(permissions)
      const firstMenu = getFirstMenu(defaultMenus, newPermissions)
      setToken(token)
      dispatch(setUserInfo(user))
      dispatch(setPermissions(newPermissions))
      navigate(firstMenu)
    } finally {
      setLoading(false)
    }
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
      <div className={`
        ${themeCache === 'dark' ? 'bg-black text-white' : 'bg-light-400'}
        w-screen
        h-screen
        relative
      `}>
        <div className={`
          w-300px
          h-290px
          p-30px
          rounded-5px
          ${themeCache === 'dark' ? 'bg-black bg-dark-200' : 'bg-white'}
          box-border
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
        `}>
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
            initialValues={{
              username: 'admin',
              password: 'admin123456'
            }}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input
                allow-clear="true"
                placeholder="用户名"
                data-test="username"
                autoComplete="username"
                addonBefore={<UserOutlined className='change' />}
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
                autoComplete="current-password"
                addonBefore={<LockOutlined className='change' />}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full mt-5px rounded-5px tracking-2px"
                loading={isLoading}
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