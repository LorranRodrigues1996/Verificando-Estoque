import express from 'express'
import { addInformatica, listInformatica, getCodigoProduto } from '../controllers/informaticaController.js'

const router = express.Router()

router.post('/add', addInformatica)
router.get('/', listInformatica)
router.get('/:id/aulas', getCodigoProduto)


export default router