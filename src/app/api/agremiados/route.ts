
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Agremiado from "@/lib/models/Agremiado";
import { promises as fs } from 'fs';
import bcrypt from 'bcrypt'

export async function GET() {
    connectDB()
    const agremiados = await Agremiado.find()
    return NextResponse.json({
        agremiados
    })
}

export async function POST(request) {
    connectDB()
    const data = await request.json()
    const newAgremiado = new Agremiado(data)
    const savedAgremiado = await newAgremiado.save()
    console.log(savedAgremiado)
    return NextResponse.json({
        savedAgremiado
    })
}

// export async function POST() {
//     connectDB()
//     const file = await fs.readFile(process.cwd() + '/public/agremiados_corregidos.json', 'utf8');
//     const data = JSON.parse(file);
//     for (const agremiado of data) {       
//         let singleAgremiado = {
//             expediente: agremiado.expediente,
//             rfc: agremiado.rfc,
//             curp: agremiado.curp,
//             biograficos: {
//                 nombre: agremiado.nombre,
//                 paterno: agremiado.paterno,
//                 materno: agremiado.materno,
//                 nacimiento: agremiado.fechaNacimiento,
//                 genero: agremiado.genero,
//                 foto: `${agremiado.expediente}.jpg`,
//             },
//             laborales: {
//                 cargo: agremiado.cargo,
//                 nivel: agremiado.nivel,
//                 region: agremiado.region,
//                 seccion: agremiado.seccion,
//                 ingresoSep: agremiado.ingresoSep,
//                 at: agremiado.at === 'True',
//                 pt: agremiado.pt === 'True',
//                 st: agremiado.st === 'True',
//                 concepto33: agremiado.concepto33 === 'True',
//                 issstep: agremiado.issstep === 'True',
//             },
//             direccion: {
//                 calle: agremiado.calle,
//                 exterior: agremiado.exterior,
//                 colonia: agremiado.colonia,
//                 interior: agremiado.interior,
//                 ciudad: agremiado.municipio,
//                 localidad: agremiado.localidad,
//                 estado: agremiado.estado,
//                 postal: agremiado.postal
//             },
//             contacto: {
//                 celular: agremiado.celular,
//                 email: agremiado.email == '' ? undefined : agremiado.email,
//             },
//             password: bcrypt.hashSync(String(agremiado.rfc).slice(-4).toUpperCase(), 10)
//         }
//         const newAgremiado = new Agremiado(singleAgremiado)
//         console.log(newAgremiado)
//         const savedAgremiado = await newAgremiado.save()
//         console.log(savedAgremiado)
//     }

//     return NextResponse.json({
//         message: 'Agremiados cargados'
//     })
// }