import {useEffect, useState, useRef} from 'react' //Hooks do react 
import './Style.css'
import Particles from '../../components/Particles/index.jsx'
import Lixeira from '../../assets/lixeira.svg'
import api from '../../services/api'

function Home() {
  const [users, setUsers] = useState([])

  const inputName = useRef( )
  const inputEmail = useRef( )
  const inputAge = useRef()


  async function getUsers (){

     const usersFromapi = await api.get('/usuarios')

    setUsers (usersFromapi.data)

  }

 async function createUsers (){

    const usersFromapi = await api.post('/usuarios', {
      name: inputName.current.value,
      email: inputEmail.current.value,
      age: inputAge.current.value
    })

    getUsers (usersFromapi.data)
  }

  async function deleteUsers (id) {
    const usersFromapi = await api.delete(`/usuarios/${id}`)  

    getUsers()
  }

  useEffect (() => {
    getUsers ()
  }, [])


  return (
    <div className='container'>
      <Particles />
      
      <form action="">
        <h1>Cadastro de Usuários Api Nodejs e React</h1>
        <input name='name' type="text" placeholder='Digite seu nome' ref={inputName} />
        <input name='email' type="email" placeholder='Digite seu email' ref={inputEmail} />
        <input name='idade' type="number" placeholder='Digite sua idade' ref={inputAge} />
        <button type='submit' onClick={createUsers}>Cadastrar</button>
      </form>
       
      {users.map((user) => (
      <div className='card' key={user.id}> 
        <div>
        <p>Nome: <span>{user.name} </span></p>
        <p>Idade: <span>{user.age} </span></p>
        <p>Email: <span>{user.email} </span></p>
        </div>
        <button onClick ={ () => deleteUsers(user.id)}>
          <img src= {Lixeira} alt="Excluir" />
        </button>
      </div>
      ))}
    </div>
  )
}
export default Home
