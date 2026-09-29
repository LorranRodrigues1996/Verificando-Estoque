import Eletronico from "../models/Eletronico.js";
/**
 * Adicionando um usuário ao banco de dados   
 */
const addEletronico = async (req, res) => {
  console.log("Entrou na função addProduto()", req.body);
    const {
      nome,
      marca,
      preco,
      estoque,
      categoria,
      ativo,
    } = req.body;
  try {
    // 1. Criar o produto
    const novoProduto = new Eletronico({
      nome,
      marca,
      preco,
      estoque,
      categoria,
      ativo,
    });
    
    await novoProduto.save();

    res.json({ success: true, produto: novoProduto });
    console.log("Produto salvo com sucesso!");
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Erro ao salvar produto' });
  }
};

const listEletronicos = async (req, res) => {
    try {
    const produto = await Eletronico.find()
    res.status(200).json({ success: true, produto });
    console.log(produto)
  } catch (err) {
    res.status(500).json({ success: false, message: 'Erro ao buscar produto', error: err });
    console.log(err)
  }
}

const getCodigoProduto = async (req, res) => {
  console.log("Acessou a função getCodigoProduto()")
  try {
    const produto = await Eletronico.findById(req.params.id)
    if (!produto) {
      return res.status(404).json({ success: false, message: 'produto não encontrado' });
    }
    console.log(produto)
    res.json({ success: true, produto });
  } catch (error) {
    console.log("Erro ao recuperar dados do produto -------------------> getProduto()",error)
    res.status(500).json({ success: false, error: 'Erro ao buscar produto', detalhes: error.message });
  }
};
export { addEletronico, listEletronicos, getCodigoProduto }