const { Router } = require('express')
const StarSystemController = require('../controllers/starsystem')
const upload = require('../middlewares/upload')

const controller = new StarSystemController()

const router = Router()

/**
 * @swagger
 * tags:
 *  name: StarSystems
 *  description: Endpoints para gerenciamento das subcategorias (estrelas)
 * /star-systems:
 *  get:
 *    summary: Listar todas as subcategorias (estrelas)
 *    tags: [StarSystems]
 *    responses:
 *      200:
 *        description: Dados de todas as subcategorias (estrelas) listados com sucesso.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/StarSystem'
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
 *    summary: Cadastrar uma nova subcategoria (estrela)
 *    tags: [StarSystems]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - name
 *              - description
 *              - galaxy_id
 *            properties:
 *              name:
 *                type: string
 *              description:
 *                type: string
 *              galaxy_id:
 *                type: integer
 *              parameters:
 *                type: string
 *    responses:
 *      201:
 *        description: Nova subcategoria (estrela) cadastrada no banco de dados
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  $ref: '#/components/schemas/StarSystem'
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
 * /star-systems/{id}:
 *  get:
 *    summary: Visualizar categoria (estrela)
 *    tags: [StarSystems]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: O id da subcategoria (estrela)
 *    responses:
 *      200:
 *        description: Dados da subcategoria (estrela) listados com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  $ref: '#/components/schemas/StarSystem'
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
 *    summary: Atualizar subcategoria (estrela)
 *    tags: [StarSystems]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: O id da subcategoria (estrela)
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
 *              galaxy_id:
 *                type: integer
 *              parameters:
 *                type: string
 *    responses:
 *      200:
 *        description: Dados da subcategoria (estrela) atualizados com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  $ref: '#/components/schemas/StarSystem'
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
 *    summary: Excluir subcategoria (estrela)
 *    tags: [StarSystems]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: O id da subcategoria (estrela)
 *    responses:
 *      204:
 *        description: Subcategoria (estrela) excluída com sucesso
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
 * /star-systems/add-parameters:
 *  put:
 *    summary: Atualizar os parâmetros utilizados na renderização dos objetos 3D das subcategorias (estrelas)
 *    tags: [StarSystems]
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
 *                - galaxy_id
 *                - parameters
 *              properties:
 *                id:
 *                  type: integer
 *                name:
 *                  type: string
 *                description:
 *                  type: string
 *                galaxy_id:
 *                  type: integer
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
 *                    $ref: '#/components/schemas/StarSystem'
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
 * /star-systems/batch:
 *  post:
 *    summary: Cadastrar subcategorias (estrelas) em lote
 *    tags: [StarSystems]
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
    const { galaxy_id } = req.query
    let conditions = {}

    if (galaxy_id) {
      conditions = { galaxy_id }
    }

    const instances = await controller.List(conditions)

    res.status(200).send({ data: instances })
  } catch (error) {
    res.status(500).send({ message: "Erro interno", error: error.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const { name, description, parameters, galaxy_id } = req.body

    const instance = await controller.Create({ name, description, parameters, galaxy_id })

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