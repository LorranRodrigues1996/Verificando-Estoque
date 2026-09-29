import mongoose from 'mongoose';

const informaticaSchema = new mongoose.Schema({
    nome: { type: String },
    marca: { type: String },
    preco: { type: Number },
    estoque: { type: Number },
    categoria: { type: String },
    ativo: { type: Boolean },
    destaque: { type: Boolean }
});

const Informatica = mongoose.model("Informatica", informaticaSchema)
export default Informatica