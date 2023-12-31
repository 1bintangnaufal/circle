import { Repository } from "typeorm";
import { User } from "../entities/UsersEntity";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";

class UsersService {
    private readonly userRepository: Repository<User> =
        AppDataSource.getRepository(User)

    //get all data
    async findAll(req: Request, res: Response): Promise<Response> {
        try {
            const findUsers = await this.userRepository.find()
            if (!findUsers) {
                return res.status(404).json({ Message: "No users available" })
            }
            return res.status(200).json(findUsers)
        } catch (error) {
            return res.status(500).json({ Message: "Error while getting all user data" })
        }
    }

    //get data by ID
    async findByID(req: Request, res: Response): Promise<Response> {
        const id = parseInt(req.params.id)
        try {
            const findAUser = await this.userRepository.findOne({ 
                where: 
                { id: id }
            })
            if (!findAUser) {
                return res.status(404).json({ Message: "User not found" })
            }
            return res.status(200).json(findAUser)
        } catch (error) {
            return res.status(500).json({ Message: `Error while getting the user data with id number ${id}` })
        }
    }

    //create data
    async create(req: Request, res: Response): Promise<Response> {
        const {
            username,
            full_name,
            email,
            password,
            avatar,
            bio,
            banner
        } = req.body
        try {
            const newUser = this.userRepository.create({
                username,
                full_name,
                email,
                password,
                avatar,
                bio,
                banner
            })
            const saveNewUser = await this.userRepository.save(newUser)
            return res.status(201).json(saveNewUser)
        } catch (error) {
            return res.status(500).json({ Message: "Error while creating this new user" })
        }
    }

    //update data
    async update(req: Request, res: Response): Promise<Response> {
        const id = parseInt(req.params.id)
        const { 
            username, 
            full_name, 
            email,
            password, 
            avatar, 
            bio,
            banner 
        } = req.body
        try {
            const findAUser = await this.userRepository.findOne({ where: { id: id } })
            if (!findAUser) {
                return res.status(404).json({ error: "User not found" })
            }
            if (username !== undefined && username !== "") {
                findAUser.username = username
            }
            if (full_name !== undefined && full_name !== "") {
                findAUser.full_name = full_name
            }
            if (email !== undefined && email !== "") {
                findAUser.email = email
            }
            if (password !== undefined && password !== "") {
                findAUser.password = password
            }
            if (avatar !== undefined && avatar !== "") {
                findAUser.avatar = avatar
            }
            if (bio !== undefined && bio !== "") {
                findAUser.bio = bio
            }
            if (banner !== undefined && bio !== "") {
                findAUser.banner = banner
            }
            const saveChanges = await this.userRepository.save(findAUser)
            return res.status(200).json(saveChanges)
        } catch (error) {
            return res.status(500).json({ Message: `Error while updating the user data with id number ${id}` })
        }
    }

    //delete data
    async delete(req: Request, res: Response): Promise<Response> {
        const id = parseInt(req.params.id)
        try {
            const findAUser = await this.userRepository.findOne({ where: { id: id } })
            if (!findAUser) {
                return res.status(404).json({ Message: "User not found" })
            }
            await this.userRepository.remove(findAUser)
            return res.status(204).send()
        } catch (error) {
            return res.status(500).json({ Message: `Error while deleting the user data with id number ${id}` })
        }
    }
}

export default new UsersService