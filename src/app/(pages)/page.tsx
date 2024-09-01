"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import profile from '../../../public/user.png'
import { Card, Form, Col, Row, Input, Button, Flex } from 'antd';
import FormItem from 'antd/es/form/FormItem';

const tabListPersonal = [
  {
    key: 'biograficos',
    tab: 'Datos del agremiado',
  },
  {
    key: 'direccion',
    tab: 'Dirección',
  },
];

const tabListCCT = [
  {
    key: 'cctActual',
    tab: 'Centro de trabajo actual',
  },
  {
    key: 'cctHistorial',
    tab: 'Historial de centros de trabajo',
  },
  {
    key: 'nombramientos',
    tab: 'Nombramientos',
  },
];

const contentListPersonal: Record<string, React.ReactNode> = {
  biograficos: <Form layout='vertical'>
    <Row gutter={[16, 16]} align={'bottom'}>
      <Col sm={{ span: 24 }} md={{ span: 8 }}>
        <FormItem label="Número de expediente">
          <Input placeholder="000001" disabled />
        </FormItem>
      </Col>
      <Col sm={{ span: 24 }} md={{ span: 8 }}>
        <FormItem label="RFC">
          <Input placeholder="001122334455667" disabled />
        </FormItem>
      </Col>
      <Col sm={{ span: 24 }} md={{ span: 8 }}>
        <FormItem label="CURP">
          <Input placeholder="00112233445566778899" disabled />
        </FormItem>
      </Col>
      <Col sm={{ span: 24 }} md={{ span: 8 }}>
        <FormItem label="Nombre(s)">
          <Input placeholder="Nombre(s) del agremiado" disabled />
        </FormItem>
      </Col>
      <Col sm={{ span: 24 }} md={{ span: 8 }}>
        <FormItem label="Apellido paterno">
          <Input placeholder="Apellido paterno del agremiado" disabled />
        </FormItem>
      </Col>
      <Col sm={{ span: 24 }} md={{ span: 8 }}>
        <FormItem label="Apellido materno">
          <Input placeholder="Apellido materno del agremiado" disabled />
        </FormItem>
      </Col>
    </Row>
  </Form>,
  direccion: <Form layout='vertical'>
    <Row gutter={[16, 16]} align={'bottom'}>
      <Col sm={{ span: 24 }} md={{ span: 8 }}>
        <FormItem label="Calle">
          <Input placeholder="" disabled />
        </FormItem>
      </Col>
      <Col sm={{ span: 24 }} md={{ span: 4 }}>
        <FormItem label="Número exterior">
          <Input placeholder="" disabled />
        </FormItem>
      </Col>
      <Col sm={{ span: 24 }} md={{ span: 4 }}>
        <FormItem label="Número interior">
          <Input placeholder="" disabled />
        </FormItem>
      </Col>
      <Col sm={{ span: 24 }} md={{ span: 8 }}>
        <FormItem label="Colonia">
          <Input placeholder="" disabled />
        </FormItem>
      </Col>
      <Col sm={{ span: 24 }} md={{ span: 8 }}>
        <FormItem label="Localidad">
          <Input placeholder="" disabled />
        </FormItem>
      </Col>
      <Col sm={{ span: 24 }} md={{ span: 8 }}>
        <FormItem label="Municipio">
          <Input placeholder="" disabled />
        </FormItem>
      </Col>
      <Col sm={{ span: 24 }} md={{ span: 8 }}>
        <FormItem label="Estado">
          <Input placeholder="" disabled />
        </FormItem>
      </Col>
    </Row>
  </Form>
}
const contentListCCT: Record<string, React.ReactNode> = {
  cctActual: <p>Centro de trabajo actual</p>,
  cctHistorial: <p>Historial de centros de trabajo</p>,
};

const App: React.FC = () => {
  const [form] = Form.useForm();

  const [activeTabPersonales, setActiveTabPersonales] = useState<string>('biograficos')
  const [activeTabDireccion, setActiveTabDireccion] = useState<string>('direccion')
  const [activeTabActual, setActiveTabActual] = useState<string>('cctActual');
  const [activeTabHistorial, setActiveTabHistorial] = useState<string>('cctHistorial');
  const [activeTabNombramientos, setActiveTabNombramientos] = useState<string>('nombramientos');

  const onTabCCTChange = (key: string) => {
    setActiveTabActual(key);
  };

  const onTabDatosChange = (key: string) => {
    setActiveTabPersonales(key);
  };

  return (
    <Card title="Bienvenido, agremiado">
      <Row gutter={[16, 16]} align={'top'}>
        <Col xs={{ span: 24 }} lg={{ span: 6 }}>
          <Card>
            <div style={{
              maxWidth: '100%',
              minHeight: 300,
              padding: '0.25rem'
            }}>
              <Image src={profile} alt='Perfil' style={{
                width: '100%',
                height: 'auto'
              }} />
            </div>
          </Card>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 18 }}>
          <Card title="Datos personales" tabList={tabListPersonal} activeTabKey={activeTabPersonales} onTabChange={onTabDatosChange}>
            {contentListPersonal[activeTabPersonales]}
          </Card>
          <Card title="Datos laborales" style={{ marginTop: 16 }} tabList={tabListCCT} activeTabKey={activeTabActual} onTabChange={onTabCCTChange}>
            {contentListCCT[activeTabActual]}
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default App;