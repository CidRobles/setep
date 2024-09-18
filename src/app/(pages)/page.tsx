"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, Form, Col, Row, Input, Skeleton, Button } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { useSession } from "next-auth/react";
import { PDFDownloadLink } from '@react-pdf/renderer';
import Credencial from './components/Credencial';
import { capitalize } from '@/lib/utils/utils'

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
    key: 'laborales',
    tab: 'Datos generales',
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

const contentListPersonal = (agremiado, key) => {
  switch (key) {
    case 'biograficos':
      return (
        <Form layout='vertical'>
          <Row gutter={[16, 16]} align={'bottom'} >
            <Col sm={{ span: 24 }} md={{ span: 8 }} style={{ width: '100%' }}>
              <FormItem label="Número de expediente">
                <Input value={agremiado.expediente} disabled />
              </FormItem>
            </Col>
            <Col sm={{ span: 24 }} md={{ span: 8 }} style={{ width: '100%' }}>
              <FormItem label="RFC">
                <Input value={agremiado.rfc} disabled />
              </FormItem>
            </Col>
            <Col sm={{ span: 24 }} md={{ span: 8 }} style={{ width: '100%' }}>
              <FormItem label="CURP">
                <Input value={agremiado.curp} disabled />
              </FormItem>
            </Col>
            <Col sm={{ span: 24 }} md={{ span: 8 }} style={{ width: '100%' }}>
              <FormItem label="Nombre(s)">
                <Input value={capitalize(agremiado.biograficos.nombre)} disabled />
              </FormItem>
            </Col>
            <Col sm={{ span: 24 }} md={{ span: 8 }} style={{ width: '100%' }}>
              <FormItem label="Apellido paterno">
                <Input value={capitalize(agremiado.biograficos.paterno)} disabled />
              </FormItem>
            </Col>
            <Col sm={{ span: 24 }} md={{ span: 8 }} style={{ width: '100%' }}>
              <FormItem label="Apellido materno">
                <Input value={capitalize(agremiado.biograficos.materno)} disabled />
              </FormItem>
            </Col>
          </Row>
        </Form>
      )
      break;
    case 'direccion':
      return (
        <Form layout='vertical'>
          <Row gutter={[16, 16]} align={'bottom'}>
            <Col sm={{ span: 24 }} md={{ span: 8 }} style={{ width: '100%' }}>
              <FormItem label="Calle">
                <Input value={capitalize(agremiado.direccion.calle)} disabled />
              </FormItem>
            </Col>
            <Col sm={{ span: 24 }} md={{ span: 4 }} style={{ width: '100%' }}>
              <FormItem label="Número exterior">
                <Input value={capitalize(agremiado.direccion.exterior)} disabled />
              </FormItem>
            </Col>
            <Col sm={{ span: 24 }} md={{ span: 4 }} style={{ width: '100%' }}>
              <FormItem label="Número interior">
                <Input value={capitalize(agremiado.direccion.interior)} disabled />
              </FormItem>
            </Col>
            <Col sm={{ span: 24 }} md={{ span: 8 }} style={{ width: '100%' }}>
              <FormItem label="Colonia">
                <Input value={capitalize(agremiado.direccion.colonia)} disabled />
              </FormItem>
            </Col>
            <Col sm={{ span: 24 }} md={{ span: 8 }} style={{ width: '100%' }}>
              <FormItem label="Localidad">
                <Input value={capitalize(agremiado.direccion.localidad)} disabled />
              </FormItem>
            </Col>
            <Col sm={{ span: 24 }} md={{ span: 8 }} style={{ width: '100%' }}>
              <FormItem label="Municipio">
                <Input value={capitalize(agremiado.direccion.ciudad)} disabled />
              </FormItem>
            </Col>
            <Col sm={{ span: 24 }} md={{ span: 8 }} style={{ width: '100%' }}>
              <FormItem label="Estado">
                <Input value={agremiado.direccion.estado} disabled style={{ textTransform: 'uppercase' }} />
              </FormItem>
            </Col>
          </Row>
        </Form>
      )
      break;
    default:
      break;
  }
}
const contentListCCT = (agremiado, key) => {
  switch (key) {
    case 'laborales':
      return (
        <Form layout='vertical'>
          <Row gutter={[16, 16]} align={'bottom'}>
            <Col sm={{ span: 24 }} md={{span: 12}} xl={{ span: 6 }} style={{ width: '100%' }}>
              <FormItem label="Cargo">
                <Input value={capitalize(agremiado.laborales.cargo)} disabled />
              </FormItem>
            </Col>
            <Col sm={{ span: 24 }} md={{span: 12}} xl={{ span: 4 }} style={{ width: '100%' }}>
              <FormItem label="Nivel">
                <Input value={capitalize(agremiado.laborales.nivel)} disabled />
              </FormItem>
            </Col>
            <Col sm={{ span: 24 }} md={{span: 12}} xl={{ span: 4 }} style={{ width: '100%' }}>
              <FormItem label="Región">
                <Input value={capitalize(agremiado.laborales.region)} disabled />
              </FormItem>
            </Col>
            <Col sm={{ span: 24 }} md={{span: 12}} xl={{ span: 2 }} style={{ width: '100%' }}>
              <FormItem label="Sección">
                <Input value={agremiado.laborales.seccion} disabled style={{ textTransform: 'uppercase' }} />
              </FormItem>
            </Col>
            <Col sm={{ span: 24 }} md={{span: 12}} xl={{ span: 8 }} style={{ width: '100%' }}>
              <FormItem label="Fecha de ingreso a la SEP">
                <Input value={agremiado.laborales.ingresoSep} disabled />
              </FormItem>
            </Col>
          </Row>
        </Form>
      )
      break;
    case 'cctHistorial':

      break;
    case 'nombramientos':

      break;
    default:
      break;
  }

};

function ImageFallback({ src, fallBackSrc, alt, ...rest }) {
  const [imgSrc, setImgSrc] = useState(src)
  useEffect(() => {
    setImgSrc(src)
  }, [src])

  return (
    <Image
      {...rest}
      alt={alt}
      src={imgSrc}
      onLoad={(result) => {
        if (result.target.naturalWidth === 0) {
          // Broken image
          setImgSrc(fallBackSrc);
        }
      }}
      onError={() => {
        setImgSrc(fallBackSrc);
      }}
    />
  );
}

const App: React.FC = () => {
  const [form] = Form.useForm();
  const { data: session } = useSession()
  const [activeTabPersonales, setActiveTabPersonales] = useState<string>('biograficos')
  const [activeTabActual, setActiveTabActual] = useState<string>('laborales');

  const [agremiado, setAgremiado] = useState(null)

  const onTabCCTChange = (key: string) => {
    setActiveTabActual(key);
  };

  const onTabDatosChange = (key: string) => {
    setActiveTabPersonales(key);
  };

  useEffect(() => {
    async function fetchAgremiado(id: string) {
      let res = await fetch(`http://localhost:3000/api/agremiados/${id}`)
      let data = await res.json()
      setAgremiado(data.foundAgremiado)
    }
    fetchAgremiado(session?.user.id)
  }, [])

  if (!agremiado) return (
    <Skeleton avatar paragraph={{ rows: 4 }} />
  )

  return (
    <Card title={`Bienvenido ${capitalize(agremiado?.biograficos.nombre)}`} extra={
      <Button>
        <PDFDownloadLink document={<Credencial data={agremiado} />} fileName={`credencial_${agremiado.expediente}.pdf`} style={{ color: 'primary' }}>
          {({ blob, url, loading, error }) => (loading ? 'Cargando...' : 'Descargar mi credencial')}
        </PDFDownloadLink>
      </Button>
    }>
      <Row gutter={[16, 16]} align={'top'}>
        <Col xs={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 5 }}>
          <Card>
            <div style={{
              maxWidth: '100%',
              minHeight: 240,
              padding: '0.25rem'
            }}>
              <ImageFallback
                src={`https://s3.amazonaws.com/setep.app/fotos/${agremiado.biograficos.foto}`}
                fallBackSrc={'https://s3.amazonaws.com/setep.app/fotos/user.png'}
                alt={`${agremiado.biograficos.nombre} ${agremiado.biograficos.paterno} ${agremiado.biograficos.materno}`}
                sizes="100vw"
                style={{
                  width: '100%',
                  height: 'auto',
                }}
                width={300}
                height={200}
              >
              </ImageFallback>
            </div>
          </Card>
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 16 }} lg={{ span: 16 }} xl={{ span: 19 }}>
          <Card title="Datos personales" tabList={tabListPersonal} activeTabKey={activeTabPersonales} onTabChange={onTabDatosChange}>
            {contentListPersonal(agremiado, activeTabPersonales)}
          </Card>
          <Card title="Datos laborales" style={{ marginTop: 16 }} tabList={tabListCCT} activeTabKey={activeTabActual} onTabChange={onTabCCTChange}>
            {contentListCCT(agremiado, activeTabActual)}
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default App;