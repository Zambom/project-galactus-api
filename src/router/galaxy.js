const { Router } = require('express')
const GalaxyController = require('../controllers/galaxy')
const upload = require('../middlewares/upload')

const controller= new GalaxyController()

const router = Router()

/**
 * @swagger
 * tags:
 *  name: Galaxies
 *  description: Endpoints para gerenciamento das categorias (galáxias)
 * /galaxies:
 *  get:
 *    summary: Listar todas as categorias (galáxias)
 *    tags: [Galaxies]
 *    responses:
 *      200:
 *        description: Dados de todas as categorias (galáxias) listados com sucesso.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Galaxy'
 *      500:
 *        description: Erro na requisição
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                error:
 *                  type: string
 *                  description: Mensagem mais descritiva do erro ocorrido.
 *  post:
 *    summary: Cadastrar uma nova categoria (galáxia)
 *    tags: [Galaxies]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - name
 *              - description
 *            properties:
 *              name:
 *                type: string
 *              description:
 *                type: string
 *              parameters:
 *                type: string
 *    responses:
 *      201:
 *        description: Nova categoria (galáxia) cadastrada no banco de dados
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  $ref: '#/components/schemas/Galaxy'
 *      500:
 *        description: Erro na requisição
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                error:
 *                  type: string
 *                  description: Mensagem mais descritiva do erro ocorrido.
 * /galaxies/{id}:
 *  get:
 *    summary: Visualizar categoria (galáxia)
 *    tags: [Galaxies]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: O id da categoria (galáxia)
 *    responses:
 *      200:
 *        description: Dados da categoria (galáxia) listados com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  $ref: '#/components/schemas/Galaxy'
 *      500:
 *        description: Erro na requisição
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                error:
 *                  type: string
 *                  description: Mensagem mais descritiva do erro ocorrido.
 *  put:
 *    summary: Atualizar categoria (galáxia)
 *    tags: [Galaxies]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: O id da categoria (galáxia)
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              description:
 *                type: string
 *              parameters:
 *                type: string
 *    responses:
 *      200:
 *        description: Dados da categoria (galáxia) atualizados com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  $ref: '#/components/schemas/Galaxy'
 *      500:
 *        description: Erro na requisição
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                error:
 *                  type: string
 *                  description: Mensagem mais descritiva do erro ocorrido.
 *  delete:
 *    summary: Excluir categoria (galáxia)
 *    tags: [Galaxies]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: O id da categoria (galáxia)
 *    responses:
 *      204:
 *        description: Categoria (galáxia) excluída com sucesso
 *      500:
 *        description: Erro na requisição
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                error:
 *                  type: string
 *                  description: Mensagem mais descritiva do erro ocorrido.
 * /galaxies/add-parameters:
 *  put:
 *    summary: Atualizar os parâmetros utilizados na renderização dos objetos 3D das categorias (galáxias)
 *    tags: [Galaxies]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              type: object
 *              required:
 *                - id
 *                - name
 *                - description
 *                - parameters
 *              properties:
 *                id:
 *                  type: integer
 *                name:
 *                  type: string
 *                description:
 *                  type: string
 *                parameters:
 *                  type: string
 *    responses:
 *      200:
 *        description: Parâmetros atualizados
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Galaxy'
 *      500:
 *        description: Erro na requisição
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                error:
 *                  type: string
 *                  description: Mensagem mais descritiva do erro ocorrido.
 * /galaxies/batch:
 *  post:
 *    summary: Cadastrar categorias (galáxias) em lote
 *    tags: [Galaxies]
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              csv:
 *                type: string
 *                format: binary
 *          encoding:
 *            csv:
 *              contentType: text/csv
 *    responses:
 *      200:
 *        description: Processo de cadastro em lote iniciado
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 */

router.get('/', async (req, res) => {
  try {
    const instances = await controller.List()

    res.status(201).send({ data: instances })
  } catch (error) {
    res.status(500).send({ message: "Erro interno", error: error.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body

    const instance = await controller.Create({ name, description })

    res.status(201).send({ data: instance })
  } catch (error) {
    res.status(500).send({ message: "Erro interno", error: error.message })
  }
})

router.post('/batch', upload.single('csv'), async (req, res) => {
    controller.batchInsert(`uploads/${req.file.filename}`)

    res.status(200).send({ message: 'Processo iniciado.' })
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const instance = await controller.Get(id)

    res.status(200).send({ data: instance })
  } catch (error) {
    res.status(500).send({ message: "Erro interno", error: error.message })
  }
})

router.put('/add-parameters', async (req, res) => {
  try {
    const { data } = req.body

    const instances = await controller.UpdateParameters(data)

    res.status(200).send({ data: instances })
  } catch (error) {
    res.status(500).send({ message: "Error interno", error: error.message })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const data = req.body

    const instance = await controller.Update(id, data)

    res.status(200).send({ data: instance })
  } catch (error) {
    res.status(500).send({ message: "Erro interno", error: error.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params

    await controller.Delete(id)

    res.status(204).send()
  } catch (error) {
    res.status(500).send({ message: "Erro interno", error: error.message })
  }
})

module.exports = router