import { FaUserEdit } from "react-icons/fa"
import { MdOutlineDelete } from "react-icons/md"
import { z } from 'zod'
export default function Index(){

    const userSChema = z.object({
        id: z.string().uuid(),
        nome: z.string().min(2),
        number: z.number().min(1),
        email: z.string().email()
    })
    const users = [
        {
            id: crypto.randomUUID(),
            nome: 'Pedro Costa',
            number: 923757466,
            email: 'pedro@gmail.com'
        },
        {   
            id: crypto.randomUUID(),
            nome: 'Lucas Morais',
            number: 934567966,
            email: 'lucas@gmail.com'
        },
        {
            id: crypto.randomUUID(),
            nome: 'Antonio Mario',
            number: 946638794,
            email: 'mario@gmail.com'
        }
    ]

    
    userSChema.safeParse(users)

    return(
        <div className="bg-gray-50 w-[90%] mx-auto flex flex-col justify-center items-center h-screen border">
            {users.map((user, index) => (
                <div key={index} className="flex text-zinc-600 text-lg justify-around max-w-[80%] h-20 shadow-xl ">
                    <div className="flex justify-around items-center gap-x-14 font-semibold">
                        <p>{index+1}</p>
                        <p>id: {user.id} </p>
                        <p>Nome: {user.nome}</p>
                        <p>Número Telefónico: {user.number}</p>
                        <p>email: {user.email}</p>
                    </div>
                    <div className="flex justify-around items-center gap-2">
                    <FaUserEdit  size={25}/>
                    <MdOutlineDelete size={25}/>
                    </div>
                </div> 
            ))}
            
        </div>
       
    )
}