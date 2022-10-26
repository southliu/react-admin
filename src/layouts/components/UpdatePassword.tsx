import type { FormProps } from 'antd/es/form/Form'
import { Ref, useImperativeHandle } from 'react'
import { useState } from 'react'
import { Form, Input, message } from 'antd'
import { PLEASE_ENTER } from '@/utils/config'
import { updatePassword } from '@/servers/login'
import { useLoading } from '@/hooks/useLoading'
import BasicModal from '@/components/Modal/BasicModal'
import PasswordStrength from '@/components/PasswordStrength'

export interface IPasswordModal {
  open: () => void;
}

interface IProps {
  passwordRef: Ref<IPasswordModal>;
}

function UpdatePassword(props: IProps) {
  const { passwordRef } = props
  const [form] = Form.useForm()
  const [isOpen, setOpen] = useState(false)
  const { isLoading, startLoading, endLoading } = useLoading()

  // 抛出外部方法
  useImperativeHandle(
    passwordRef,
    () => ({
      open: () => {
        setOpen(true)
      }
    })
  )

  /** 点击模态框确定 */
  const onOk = () => {
    form.submit()
  }

  /**
   * 提交表单
   * @param values - 表单值
   */
  const onFinish: FormProps['onFinish'] = async values => {
    // 当密码和确认密码不同时则提示错误
    if (values.password !== values.confirmPassword) {
      return message.warning({
        content: "密码和确认密码不相同!",
        key: 'confirmPassword'
      })
    }
    try {
      startLoading()
      const { data } = await updatePassword(values)
      if (data.code === 200) {
        setOpen(false)
        message.success(data.message)
      }
    } finally {
      endLoading()
    }
  }

  return (
    <BasicModal
      title="修改密码"
      open={isOpen}
      confirmLoading={isLoading}
      onOk={onOk}
      onCancel={() => setOpen(false)}
    >
      <Form
        name="UpdatePassword"
        form={form}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请输入用户名!' }]}
        >
          <Input placeholder={PLEASE_ENTER} />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <PasswordStrength />
        </Form.Item>

        <Form.Item
          label="确认密码"
          name="confirmPassword"
          rules={[{ required: true, message: '请输入确认密码!' }]}
        >
          <PasswordStrength />
        </Form.Item>
      </Form>
    </BasicModal>
  )
}

export default UpdatePassword