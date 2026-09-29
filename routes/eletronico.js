import express from 'express'
import { addEletronico, listEletronicos, getCodigoProduto } from '../controllers/eletronicoController.js'

const router = express.Router()

router.post('/add', addEletronico)
router.get('/', listEletronicos)
router.get('/:id/aulas', getCodigoProduto)


export default router