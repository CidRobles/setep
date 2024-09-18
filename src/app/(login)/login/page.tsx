"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Row, Col, Flex, Card, Button, Form, Input, Space, Alert } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import Password from 'antd/es/input/Password';
import Image from 'next/image';

const Login: React.FC = () => {
    const router = useRouter()
    const [error, setError] = useState('')
    const onFinish = async (values: any) => {
        const { expediente, password } = values
        const result = await signIn('credentials', {
            redirect: false,
            expediente,
            password
        })        

        if (result?.ok) {
            router.push('/')
        } else if (result?.status == 401) {
            setError(`${result.error}`)
        }
    };
    return (
        <Flex align='center' justify='center' style={{ minHeight: 'calc(100vh - 2rem)' }}>
            <Row gutter={16} style={{ minWidth: '80%' }}>
                <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                    <Flex justify='center' align='center' style={{ height: '100%' }}>
                        <Image src={'https://s3.amazonaws.com/setep.app/fotos/SETEP-logo.png'} alt='SETEP' width={240} height={240}>
                        </Image>
                    </Flex>
                </Col>
                <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                    <Card>
                        <Alert type='error' message={error} style={{ display: error == '' ? 'none' : 'block', marginBottom: 16 }}></Alert>
                        <Form name="login" layout='vertical' onFinish={onFinish}>
                            <Space direction="vertical" size={'middle'} style={{ width: '100%' }}>
                                <FormItem
                                    label='Número de expediente'
                                    name="expediente"
                                    rules={[
                                        {
                                            min: 5,
                                            message: 'El número de expediente no puede tener menos de 5 caracteres'
                                        },
                                        {
                                            max: 6,
                                            message: 'El número de expediente no puede tener más de 6 caracteres'
                                        },
                                        {
                                            required: true,
                                            message: 'El número de expediente es requerido'
                                        }
                                    ]}>
                                    <Input type='text' placeholder='Ingresar número de expediente'></Input>
                                </FormItem>
                                <FormItem label='Contraseña' name="password" rules={[{
                                    required: true,
                                    message: 'La contraseña es requerida'
                                }]}>
                                    <Password />
                                </FormItem>
                                <FormItem>
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Button block type="primary" htmlType="submit">
                                                Iniciar sesión
                                            </Button>
                                        </Col>
                                        <Col offset={6} span={6}>
                                            <Button block type="text">
                                                Olvidé mi contraseña
                                            </Button>
                                        </Col>
                                    </Row>
                                </FormItem>
                            </Space>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Flex>
    )
}
export default Login;