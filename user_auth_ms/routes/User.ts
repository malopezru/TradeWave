import { Router } from 'express'
import { deleteUser, getMe, getUserById, getUsers, loginUser, postUser, putUser } from '../controller/User'

export const router = Router()

router.get('/', getUsers)
router.get('/:id', getUserById)
router.post('/register', postUser)
router.post('/login', loginUser)
router.post('/getMe', getMe)
router.put('/:id', putUser)
router.delete('/:id', deleteUser)