import { useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { z } from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import { supaBase } from "../lib/supabase"
/**
 * To-do
 * [] Validação / Transformação
 * [] Field Arrays
 * [] Update de arquivos
 * [] Composition Pattern
 * @
 */

const createUserFormSchema = z.object({
  avatar: z.instanceof(FileList)
  .transform(list => list.item(0)!)
  .refine(file => file.size <= 5 * 1024 * 1024 , 'O ficheiro só pode ter até 5Mb'),
  
  name: z.string().min(3, 'O nome é obrigatório!').toLowerCase().transform(name => {
    return(
      name.trim().split(' ').map(word => {
        return word[0].toLocaleUpperCase().concat(word.substring(1))
      }).join(' ')
    )
  }),
  
  email: z.string().nonempty('O email é obrigatório').email().refine(email => {
    return( email.endsWith('@rocketseat.com.br'))
  }, 'O email precisa ser da Rocketseat'),

  password: z.string().min(6, 'A senha precisa ter no mínimo 6 caracteres'),

  techs: z.array(z.object({
    title: z.string().nonempty('O titulo é obrigatório!'),
    knowledge: z.coerce.number().min(1, 'Apenas positivo!').max(100)    // knowladge: conhecimento
  })).min(2, 'Insira pelo menos mínimo 2 tecnologias!')
})
 
  // type createUserFormData = z.infer<typeof createUserFormSchema>

function CadastroUser() {

  const [output, setOutput] = useState('')
  const {
    register, 
    handleSubmit, 
    formState: {errors},
    control
  } = useForm({
    resolver: zodResolver(createUserFormSchema)
  })

  const { fields, append, remove} = useFieldArray({
    control,
    name: 'techs'
  })

  function addNewTech(){
    append({title: '', knowledge: 0})
  }

  async function createUser(data: any){

    await supaBase.storage.from('forms-react').upload(
      data.avatar.name, 
      data.avatar
    )


    setOutput(JSON.stringify(data, null, 2))
  }

  return (
      <main className="h-screen w-full bg-zinc-900 gap-10 text-zinc-300 flex flex-col items-center justify-center">
        <form onSubmit={handleSubmit(createUser)} className="flex flex-col gap-4 w-full max-w-[40%]">
          <div className="flex flex-col gap-1">
            <label htmlFor="avatar">Avatar</label>
            <input 
            type="file" 
            {...register('avatar')}
            />
            {errors.avatar && <span className="text-sm text-red-500" >{errors.avatar.message}</span>}
          </div>
         
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Nome</label>
            <input 
            className="border bg-zinc-800 border-gray-500 outline-none shadow-sm rounded h-10 px-3" 
            type="text" 
            {...register('name')}
            />
            {errors.name && <span className="text-sm text-red-500" >{errors.name.message}</span>}
          </div>
         
          <div className="flex flex-col gap-1">
            <label htmlFor="email">E-mail</label>
            <input 
            className="border bg-zinc-800 border-gray-500 outline-none shadow-sm rounded h-10 px-3" 
            type="email" 
            {...register('email')}
            />
            {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
          </div>
         
         <div className="flex flex-col gap-1">
          <label htmlFor="password">Senha</label>
          <input 
          className="border bg-zinc-800 border-gray-500 outline-none shadow-sm rounded h-10 px-3" 
          type="password"
          {...register('password')}
          />
          {errors.password && <span className="text-sm text-red-500">{errors.password.message}</span>}
         </div>
          
          <label htmlFor="" className="flex justify-between"> 
            Tecnologies

            <button type="button" 
            className="text-green-500 hover:text-green-700" 
            onClick={addNewTech}
            >Adicionar</button>
          </label>

          {fields.map((field, index) => {


            return(
              <div key={field.id} className="flex gap-2 justify-center">
                <div>
                  <input 
                className="flex-1 border bg-zinc-800 border-gray-500 outline-none shadow-sm rounded h-10 px-3" 
                type="text" 
                {...register(`techs.${index}.title`)}
                />
                {errors.techs?.[index]?.title && <span  className="text-sm text-red-500" >{errors.techs?.[index]?.title?.message}</span>}

                </div>
                
                <div>
                  <input 
                  className="  w-30 text-zinc-500 border bg-zinc-800 border-gray-500 outline-none shadow-sm rounded h-10 px-3" 
                  type="number" 
                  {...register(`techs.${index}.knowledge`)}
                  />
                  {errors.techs?.[index]?.knowledge && <span className="text-sm text-red-500">{errors.techs?.[index]?.knowledge?.message}</span>}
                
                </div>
              </div>
            )
          })}

          {errors.techs && <span className="text-sm text-red-500">{errors.techs.message}</span>}

          <button className="bg-green-500 h-10 rounded font-semibold text-white" type="submit">Salvar</button>
        </form>

        <pre>{output}</pre>
      </main>
  )
}

export default CadastroUser
