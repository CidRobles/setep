import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Agremiado from "@/lib/models/Agremiado";
import { message } from "antd";

export async function GET(request, { params }) {
    try {
        connectDB()
        const foundAgremiado = await Agremiado.findById(params.id)

        if (!foundAgremiado) return NextResponse.json(
            {
                message: 'No se encuentra el agremiado'
            },
            {
                status: 404
            }
        )

        return NextResponse.json({
            foundAgremiado
        })
    } catch (error) {
        return NextResponse.json(error.message, {
            status: 400
        })
    }
}

export async function PUT(request, { params }) {
    try {
        connectDB()
        const data = await request.json()
        const updatedAgremiado = await Agremiado.findByIdAndUpdate(params.id, data, { new: true })
        return NextResponse.json(updatedAgremiado)
    } catch (error) {
        return NextResponse.json(error.message, {
            status: 400
        })
    }
}