import express from 'express'
import { addProduto, listProdutos, getCodigoProduto, listProdutosPorCategoria, listProdutosDetalhado, verificaSeTemEstoqueSuficienteParaVender } from '../controllers/produtoController.js'

const router = express.Router()

router.post('/add', addProduto)
router.get('/', listProdutos)
router.post('/verificaestoque', verificaSeTemEstoqueSuficienteParaVender)
router.get('/resumo', listProdutosDetalhado)
router.get('/:id/aulas', getCodigoProduto)
router.get('/:categoria', listProdutosPorCategoria)


export default router