import React from 'react';
import { Row, Col, Flex, Card, Button, Form, Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import Image from 'next/image';
import logo from '../../../../public/SETEP-logo.png'
const Login: React.FC = () => {
    return (
        <Flex align='center' justify='center' style={{ minHeight: 'calc(100vh - 2rem)' }}>
            <Row gutter={16}>
                <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                    <Flex justify='center' align='center'>
                        <Image src={logo} alt='SETEP' style={{ maxWidth: '50%', height: 'auto' }}></Image>
                    </Flex>
                </Col>
                <Col sm={{ span: 24 }} lg={{ span: 12 }}>
                    <Card>
                        <Form layout='vertical'>
                            <FormItem label='Número de expediente'>
                                <Input type='text' placeholder='6 dígitos'></Input>
                            </FormItem>
                            <FormItem label='Contraseña'>
                                <Input type='password'></Input>
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
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Flex>
    )
}
export default Login;