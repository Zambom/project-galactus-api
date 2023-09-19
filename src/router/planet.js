const { Router } = require('express')
const PlanetController = require('../controllers/planet')
const upload = require('../middlewares/upload')

const controller = new PlanetController()

const router = Router()

/**
 * @swagger
 * tags:
 *  name: Planets
 *  description: Endpoints para gerenciamento dos modelos (planetas)
 * /planets:
 *  get:
 *    summary: Listar todas as modelos (planetas)
 *    tags: [Planets]
 *    responses:
 *      200:
 *        description: Dados de todos os modelos (planetas) listados com sucesso.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Planet'
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
 *    summary: Cadastrar um novo modelo (planeta)
 *    tags: [Planets]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - name
 *              - description
 *              - star_id
 *            properties:
 *              name:
 *                type: string
 *              description:
 *                type: string
 *              star_id:
 *                type: integer
 *              article:
 *                type: string
 *              page:
 *                type: string
 *              parameters:
 *                type: string
 *    responses:
 *      201:
 *        description: Nova modelo (planeta) cadastrado no banco de dados
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  $ref: '#/components/schemas/Planet'
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
 * /planets/{id}:
 *  get:
 *    summary: Visualizar modelo (planeta)
 *    tags: [Planets]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: O id do modelo (planeta)
 *    responses:
 *      200:
 *        description: Dados da modelo (planeta) listados com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  $ref: '#/components/schemas/Planet'
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
 *    summary: Atualizar modelo (planeta)
 *    tags: [Planets]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: O id do modelo (planeta)
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
 *              star_id:
 *                type: integer
 *              article:
 *                type: string
 *              page:
 *                type: string
 *              parameters:
 *                type: string
 *    responses:
 *      200:
 *        description: Dados da modelo (planeta) atualizados com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  $ref: '#/components/schemas/Planet'
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
 *    summary: Excluir modelo (planeta)
 *    tags: [Planets]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: O id do modelo (planeta)
 *    responses:
 *      204:
 *        description: Modelo (planeta) excluído com sucesso
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
 * /planets/add-parameters:
 *  put:
 *    summary: Atualizar os parâmetros utilizados na renderização dos objetos 3D dos modelos (planetas)
 *    tags: [Planets]
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
 *                - star_id
 *                - parameters
 *              properties:
 *                id:
 *                  type: integer
 *                name:
 *                  type: string
 *                description:
 *                  type: string
 *                star_id:
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
 *                    $ref: '#/components/schemas/Planet'
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
 * /planets/batch:
 *  post:
 *    summary: Cadastrar modelos (planetas) em lote
 *    tags: [Planets]
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
    const { star_id } = req.query
    let conditions = {}

    if (star_id) {
      conditions = { star_id }
    }

    const instances = await controller.List(conditions)

    res.status(200).send({ data: instances })
  } catch (error) {
    res.status(500).send({ message: "Erro interno", error: error.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const { 
      name, 
      description, 
      parameters, 
      article,
      page,
      star_id 
    } = req.body

    const instance = await controller.Create({ name, description, parameters, article, page, star_id })

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