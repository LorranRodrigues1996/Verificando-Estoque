import mongoose from 'mongoose';

const eletronicoSchema = new mongoose.Schema({
    nome: { type: String },
    marca: { type: String },
    preco: { type: Number },
    estoque: { type: Number },
    categoria: { type: String },
    ativo: { type: Boolean }
});

const Eletronico = mongoose.model("Eletronico", eletronicoSchema)
export default Eletronico