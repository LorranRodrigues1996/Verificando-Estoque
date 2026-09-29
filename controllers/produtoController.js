import Produto from "../models/Produto.js"
/**
 * Adicionando um usuário ao banco de dados   
 */
const addProduto = async (req, res) => {
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
    const novoProduto = new Produto({
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

const listProdutos = async (req, res) => {
    try {
    const produto = await Produto.find()
    res.status(200).json({ success: true, produto });
    console.log(produto)
  } catch (err) {
    res.status(500).json({ success: false, message: 'Erro ao buscar produto', error: err });
    console.log(err)
  }
}

const listProdutosDetalhado = async (req, res) => {
    try {
    const produto = await Produto.find()
    const resumo = produto.map((e) => Array.of("Resumo: " + e.nome + " - " + e.precoVenda + " - " + e.estoqueAtual))
    console.log(resumo)
    res.status(200).json({ success: true, resumo });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Erro ao buscar produto', error: err });
    console.log(err)
  }
}
const listProdutosPorCategoria = async (req, res) => {
  console.log("Acessou a função listProdutosPorCategoria()")
  const recebeCategoria = req.params.categoria;
    try {
    const categoria = await Produto.find({categoria: recebeCategoria}).select('categoria')
    res.status(200).json({ success: true, categoria })
    console.log(categoria)
  } catch (err) {
    res.status(500).json({ success: false, message: 'Erro ao buscar categoria', error: err });
    console.log(err)
  }
}

const getCodigoProduto = async (req, res) => {
  console.log("Acessou a função getCodigoProduto()")
  try {
    const produto = await Produto.findById(req.params.id)
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

const verificaSeTemEstoqueSuficienteParaVender = async (req, res) => {
  const dados = req.body;
  const ids = dados.produtos.map((item) => item._id);
  const produtos = await Produto.find({_id: { $in: ids }});
  const estoqueSuficiente = dados.produtos.every((itemPedido) => {
    const produtoBanco = produtos.find((produto) => produto._id.toString() === itemPedido._id);
    if (!produtoBanco) {
      return false;
    }
    return itemPedido.estoqueAtual <= produtoBanco.estoqueAtual;
  });
  if (estoqueSuficiente) {
    return res.status(200).json({
      success: true,
      message: "Estoque suficiente para venda"
    });
  }
  return res.status(400).json({
    success: false,
    message: "Estoque insuficiente para venda"
  });
}

export { addProduto, listProdutos, getCodigoProduto, listProdutosPorCategoria, listProdutosDetalhado, verificaSeTemEstoqueSuficienteParaVender }