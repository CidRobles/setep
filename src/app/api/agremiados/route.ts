
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Agremiado from "@/lib/models/Agremiado";

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