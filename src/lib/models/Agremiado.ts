import { Schema, model, models } from "mongoose";

const AgremiadoSchema = new Schema({
    expediente: {
        type: String,
        index: true,
        unique: true,
        required: [true, 'El número de expediente es requerido'],
        trim: true
    },
    rfc: {
        type: String,
        required: true,
        uppercase: true
    },
    curp: {
        type: String,
        uppercase: true
    },
    biograficos: {
        nombre: String,
        paterno: String,
        materno: String,
        nacimiento: Date,
        genero: String,
        foto: String,
    },
    laborales: {
        cargo: String,
        nivel: String,
        region: String, 
        seccion: String,
        ingresoSep: Date,
        at: Boolean,
        pt: Boolean, 
        st: Boolean,
        concepto33: Boolean,
        issstep: Boolean,        
    },
    direccion: {
        calle: String,
        exterior: String,
        interior: String,
        ciudad: String,
        localidad: String,
        estado: String,
        postal: String
    },
    contacto: {
        celular: String,
        email: {
            type: String,
            unique: true
        },
    },
    password: String
}, {
    timestamps: true
})

const Agremiado = models.Agremiado || model('Agremiado', AgremiadoSchema)

export default Agremiado;