import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response } from "express"
import { User } from "../models/User"

export const getUsers = async ( req: Request, res: Response ) => {
    const users = await User.find({})
    res.json(users)
}

export const getUserById = async ( req: Request, res: Response ) => {
    const { id } = req.params
    const user = await User.findById(id)
    if(!user) res.status(404).json('User does not exist')
    res.json(user)
}

export const postUser = async ( req: Request, res: Response ) => {
    const { body } = req
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(req.body.password, salt)
    const user = await User.findOne({
        where: {
            email: body.email
        }
    })
    if (user) return res.status(400).jsonp('User already exists')
    
    const newUser = new User({
        ...body,
        password: password
    })
    await newUser.save()
    res.json(newUser)
}

export const loginUser = async ( req: Request, res: Response ) => {
    const { body } = req
    const user = await User.findOne({
        where: {
            email: body.email
        }
    }) as any
    if (!user) return res.status(400).jsonp('User not exists')
    
    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
    if (!isPasswordCorrect) return res.status(400).jsonp('Incorrect Password')

    const token = jwt.sign({ user }, 'secret_key')
    res.json({ token: token })
}

export const getMe = async ( req: Request, res: Response ) => {
    const { authorization } = req.headers
    try {
        const user = await jwt.verify(authorization as string, 'secret_key')
        res.json((user as JwtPayload).user)
    } catch (error) {
        res.status(400).jsonp('Not valid Token')
    }
}

export const putUser = async ( req: Request, res: Response ) => {
    const { body } = req
    const { id } = req.params
    let user = await User.findOne({
        where: {
            email: body.email
        }
    })
    if (user) return res.status(400).jsonp('User already exists')
    user = await User.findById(id)
    if (!user) return res.status(400).jsonp('User id does not exist')

    await User.updateOne({ _id: id }, { body })

    res.json(user)
}

export const deleteUser = async ( req: Request, res: Response ) => {
    const { id } = req.params
    const { authorization } = req.headers;
    const user = await jwt.verify(authorization as string, 'secret_key')
    if (!user) return res.status(400).jsonp('User id does not exist')
    if ((user as JwtPayload).id != id) {
        res.status(400).jsonp(`User and token don't coincide`)
    }

    const userToDelete = await User.findById(id)
    if (!userToDelete) return res.status(400).jsonp('User id does not exist')
    await User.deleteOne({ _id: id })

    res.json(userToDelete)
}