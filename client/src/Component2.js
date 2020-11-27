import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';


const ADD_TODO = gql`
  mutation Login($login: String!) {
    login(login: $login)
  }
`;

function Component2() {
    const [login, setLogin] = useState(' ');
    const [addLogin, { data }] = useMutation(ADD_TODO);
    if(data) console.log(data);
    const onChange = (e) => {
        setLogin(e.target.value);
    }
  
    return (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            console.log({login});
            addLogin({ variables: { login: {login} } });
          }}
        >
          <input type="text" onChange={onChange} value={login}/>
          <button type="submit">Add Todo</button>
        </form>
      </div>
    );
  }
  
  export default Component2;