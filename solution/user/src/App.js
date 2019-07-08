import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .user {
    position: relative;
    width: 300px;
    height: 150px;
    border: 3px solid red;
    border-radius: 5px;
    margin-bottom: 10px;
  }

  .buttons {
    width: 100%;
    height: 30px;
    position: absolute;
    bottom: 0;
    left: 0;

    button { 
      width: 50%;
      height: 100%;
      background-color: red;
      border: 3px solid red;
      cursor: pointer;

      &:hover {
        background-color: white;
        color: red;
      }
    }
  }


`;

class App extends React.Component {
  state = {
    userData: null
  }

  componentDidMount() {
    this.getRequestHandler(); 
  }

  getRequestHandler = () => {
    axios
      .get('http://localhost:3000/api/users')
        .then(response => {
            this.setState({ userData: response.data.result });
        })
        .catch(error => {
          debugger;
        });
  }

  render() {
    return (
      <StyledApp>
        {
          this.state.userData
            ? this.state.userData.map(user => {
                return (
                    <div className="user">
                      <h2>{user.name}</h2>
                      <p>{user.bio}</p>
                      <div className="buttons">
                        <button>Delete</button>
                        <button>Update</button>
                      </div>
                    </div>
                );
              })
            : null
        }
      </StyledApp>
    );
  }
}

export default App;
