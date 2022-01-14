/**
 * @swagger
 * /api/signup:
 *  post:
 *   description: Register a new user
 *   tags:
 *   - User
 *   parameters:
 *   - name: user data
 *     in: body
 *     schema:
 *      type: object
 *      required:
 *      - email
 *      - password
 *      - firstName
 *      - lastName
 *      properties:
 *          firstName:
 *             type: string
 *          lastName:
 *             type: string
 *          email:
 *             type: string
 *          password:
 *             type: string
 *     description: User data, all fields are required
 *   responses:
 *      '200':
 *          description: A successful response
 *      '400':
 *          description: Bad request
 *      '500':
 *          description: Internal server error
 *      '403':
 *          description: Forbidden
 * 
 * /api/login:
 *  post:
 *    description: Login a user
 *    tags:
 *    - User
 *    parameters:
 *    - name: login data
 *      in: body
 *      schema:
 *       type: object
 *       required:
 *       - email
 *       - password
 *       properties:
 *         email:
 *            type: string
 *         password:
 *            type: string
 *       description: Login data, all fields are required
 *    responses:
 *      '200':
 *          description: A successful response
 *      '400':
 *          description: Bad request
 *      '500':
 *          description: Internal server error
 *      '403':
 *          description: Forbidden
 * 
 * /api/todos:
 *  get:
 *   description: Get all todos
 *   tags:
 *   - Todos
 *   produces:
 *   - application/json
 *   parameters:
 *   - name: x-access-token
 *     in: header
 *     description: Bearer token
 *     required: true
 *   responses:
 *      '200':
 *          description: A successful response
 *      '500':
 *          description: Internal server error
 *      '403':
 *          description: Unauthorized
 *  post:
 *   description: Create a new todo
 *   tags:
 *   - Todos
 *   produces:
 *   - application/json
 *   parameters:
 *   - name: x-access-token
 *     in: header
 *     description: Bearer token
 *     required: true
 *   - name: new todo data
 *     in: body
 *     description: name of the todo
 *     required: true
 *     schema:
 *      type: object
 *      required:
 *      - task
 *      properties:
 *         task:
 *           type: string
 *         done:
 *           type: boolean     
 *   responses:
 *     '200':
 *      description: Todo created
 *     '500':
 *      description: Internal server error
 *     '403':
 *      description: Unauthorized
 * 
 * /api/todos/{id}:
 *  get:
 *   description: Get a specific todo of an user
 *   tags:
 *   - Todos
 *   produces:
 *   - application/json
 *   parameters:
 *   - name: x-access-token
 *     in: header
 *     description: Bearer token
 *     required: true
 *   - name: id
 *     in: path
 *     description: Id of the todo
 *     required: true
 *     type: string
 *   responses:
 *     '200':
 *      description: A successful response
 *     '500':
 *      description: Internal server error
 *     '403':
 *      description: Unauthorized
 * 
 *  put:
 *   description: Update a specific todo of an user
 *   tags:
 *   - Todos
 *   produces:
 *   - application/json
 *   parameters:
 *   - name: x-access-token
 *     in: header
 *     description: Bearer token
 *     required: true
 *   - name: id
 *     in: path
 *     description: Id of the todo
 *     required: true
 *     type: string
 *   - name: todo data to update
 *     in: body
 *     description: todo of the user
 *     required: true
 *     schema:
 *      type: object
 *      required:
 *      - task
 *      properties:
 *         task:
 *           type: string
 *         done:
 *           type: boolean     
 *   responses:
 *    '200':
 *     description: A successful response
 *    '500':
 *     description: Internal server error
 *    '403':
 *     description: Unauthorized
 * 
 *  delete:
 *   description: Delete a specific todo of an user
 *   tags:
 *   - Todos
 *   produces:
 *   - application/json
 *   parameters:
 *   - name: x-access-token
 *     in: header
 *     description: Bearer token
 *     required: true
 *   - name: id
 *     in: path
 *     description: Id of the todo
 *     required: true
 *     type: string
 *   responses:
 *    '200':
 *     description: A successful response
 *    '500':
 *     description: Internal server error
 *    '403':
 *     description: Unauthorized
 */