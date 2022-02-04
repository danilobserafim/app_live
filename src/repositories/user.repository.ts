import user from "../models/user.model"
import db from "../db";
import  DatabaseError  from "../models/errors/database.error.model";

class Repository {
    async findAllUsers(): Promise<user[]> {
        try {
            const query = "SELECT userName, uuid FROM aplication_user"
            const {rows} = await db.query<user>(query)
            return rows || []
        } catch (error) {
            throw error
        }        
    }
    async findUserById(uuid: string): Promise<user> {
        try {
            const userId = [uuid]
            const query = "SELECT username, uuid FROM aplication_user where uuid = $1"
            const {rows} = await db.query<user>(query,userId)
            const [user] = rows
    
            return user
            
        } catch (error) {
            throw new DatabaseError("erro na consulta do id", error)
            
        }
    }

    async findUserPassword(userName: string, password: string):Promise<user | null>{
        try {
            const query = "SELECT username, uuid FROM aplication_user where username = $1 and password = crypt($2, 'my_salt')"
            const values = [userName, password]
            const {rows} = await db.query<user>(query, values)
            const [user] = rows
        return user || null 
        } catch (error) {
           throw new DatabaseError("Erro na consulta de usuário e senha");
            
        }
    
    }

    async createUser(user: user): Promise<string> {
        const query = "INSERT INTO aplication_user(username, password) VALUES($1, crypt($2, 'my_salt')) RETURNING uuid"
        const values = [user.userName, user.password]
        const {rows} = await db.query<{uuid: string}>(query, values)
        const [newUser] = rows

        return newUser.uuid;
    }

    async updateUser(user: user): Promise<void> {
        const query = "UPDATE aplication_user SET username = $1 , password = crypt($2, 'my_salt') WHERE uuid = $3"
        const values = [user.userName, user.password, user.uuid]
        await db.query<{uuid: string}>(query, values)

    }

    async removeUser(uuid: string):Promise<void>{
        const values = [uuid]
        const query = "DELETE from aplication_user WHERE uuid = $1"

        await db.query(query, values)
    }
}

export default new Repository;