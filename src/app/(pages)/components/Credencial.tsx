import React from "react";
import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import { Image } from "@react-pdf/renderer";


Font.register({
    family: 'Inter',
    fonts: [
        {
            src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf',
            fontWeight: 100,
        },
        {
            src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyfMZhrib2Bg-4.ttf',
            fontWeight: 200,
        },
        {
            src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuOKfMZhrib2Bg-4.ttf',
            fontWeight: 300,
        },
        {
            src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf',
            fontWeight: 400,
        },
        {
            src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fMZhrib2Bg-4.ttf',
            fontWeight: 500,
        },
        {
            src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZhrib2Bg-4.ttf',
            fontWeight: 600,
        },
        {
            src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf',
            fontWeight: 700,
        },
        {
            src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyYMZhrib2Bg-4.ttf',
            fontWeight: 800,
        },
        {
            src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuBWYMZhrib2Bg-4.ttf',
            fontWeight: 900,
        },
    ],
});

// Create styles
const styles = StyleSheet.create({
    page: {
        padding: '0.5cm',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        alignContent: 'center'
    },
    credencial: {
        border: '1px solid #000',
        maxHeight: '8.25cm',
        height: '8.25cm',
        maxWidth: '5.25cm',
        width: '5.25cm'
    },
    pageBackground: {
        position: 'absolute',
        minWidth: '100%',
        minHeight: '100%',
        height: '100%',
        width: '100%',
    },
    frontGrid: {
        display: 'flex',
        flexDirection: 'column',        
        padding: '0.25cm',
        paddingTop: '2.25cm'
    },
    font: {
        fontFamily: 'Inter',
        textAlign: 'center',
        color: '#000',
        fontSize: '6pt',
        lineHeight: '2pt',
        fontWeight: 'normal',
        textTransform: 'uppercase'
    },
    boldFont: {
        fontFamily: 'Inter',
        textAlign: 'center',
        color: '#000',
        fontSize: '6pt',
        lineHeight: '2pt',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    }
});

// Create Document Component
const Credencial = (data: any) => {

    let { expediente } = data.data
    let { nombre, paterno, materno, foto } = data.data.biograficos
    let { nivel, cargo, seccion, region } = data.data.laborales

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={[styles.credencial, { border: '1pt solid #000' }]}>
                    <Image src="httpss://s3.amazonaws.com/setep.app/fotos/credencial_front.jpg" style={styles.pageBackground}></Image>
                    <View style={styles.frontGrid}>
                        <View style={{ display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                            <Image
                                src={`httpss://s3.amazonaws.com/setep.app/fotos/${foto}`}
                                style={{ maxWidth: '65%', alignSelf: 'center', marginBottom: '0.25cm' }}></Image>
                        </View>
                        <View>
                            <Text style={styles.boldFont}>{`${expediente}`}</Text>
                            <Text style={[styles.font, { textTransform: 'capitalize' }]}>{`${nombre} ${paterno} ${materno}`}</Text>
                            <Text style={styles.boldFont}>{`${cargo}`}</Text>
                            <Text style={[styles.font, { textTransform: 'capitalize' }]}>{`${nivel}`}</Text>
                            <Text style={styles.boldFont}>{`${region}`}</Text>
                            <Text style={styles.font}>{`${seccion}`}</Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.credencial, { border: '1pt solid #000' }]}>
                    <Image src="httpss://s3.amazonaws.com/setep.app/fotos/credencial_back.jpg" style={styles.pageBackground}></Image>
                </View>
            </Page>
        </Document>
    )
}

export default Credencial