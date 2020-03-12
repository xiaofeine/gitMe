import React, { Component } from 'react';
import { Form, Input, Button, Checkbox, Toast } from 'antd';
import { login } from '../../https/login';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

class Login extends Component {
    render() {
        const onFinish = values => {
            console.log('Success:', values);
            let params = {
                account: values.username,
                password: values.password,
                type: values.remember?1:0
            }
            login(params).then((data)=>{
                console.log(data,'成功登陆')
            },(data)=>{
                if (data.messageCode !== 'netError' && data.messageCode !== 'sysError' && data.messageCode !== 'timeout') {
                    //此处是对除了以上几个系统异常意外的业务异常的处理
                    Toast.info(data.message, commonInfo.showToastTime);
                }
            })
        };

        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        };
        return (
            <>
                Login
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </>
        );
    }
}

export default Login;