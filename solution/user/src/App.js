import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import uuid from 'uuid';

const StyledApp = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;

  .users-wrapper {
    width: 100%;
    height: 75%;
    border-bottom: 3px solid red;
    overflow-y: scroll;
    padding-left: auto;
    margin: 0;
    box-sizing: border-box;

    &::-webkit-scrollbar {
      height: 0;
      width: 0;
    }

    .user {
      position: relative;
      width: 80%;
      min-width: 300px;
      min-height: 150px;
      border: 3px solid red;
      border-radius: 5px;
      margin: 40px auto;
      text-align: center;
      font-size: 2rem;

      h2 {
        margin-bottom: 0;
      }

      p {
        margin-top: 0;
      }

      &:last-child {
        margin-bottom: 120px;
      }
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
        font-weight: bold;
        font-size: 1.5rem;
        cursor: pointer;
  
        &:hover {
          background-color: white;
          color: red;
        }

        &:last-child {
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
        }
      }
    }
  }

  form {
    position: absolute;
    top: 65%;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 35%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: red;
    border: 3px solid red;
    border-radius: 10px;
    z-index: 2;

    input {
      width: 80%;
      height: 30px;
      border: 3px solid red;
      border-radius: 5px;
      margin-bottom: 20px;
      text-align: center;
      font-size: 2rem;
    }

    button {
      width: 20%;
      height: 35px;
      border: 3px solid red;
      border-radius: 5px;
      font-size: 2rem;
      font-weight: bold;
      cursor: pointer;
    }
  }



`;

class App extends React.Component {
  state = {
    userData: null,
    name: '',
    bio: '',
    userId: null,
    btnText: 'ADD'
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

  inputChangeHandler = (event) => {
    console.log(event.target.name)
    this.setState({ [event.target.name]: event.target.value });
  }

  toggleHandlers = () => {
    if(this.state.btnText === 'ADD') {
      this.postUserHandler();
    } else if(this.state.btnText === 'UPDATE') {
      this.updateUserHandler();
    }
  }

  postUserHandler = () => {
    axios
      .post('http://localhost:3000/api/users', {
        name: this.state.name,
        bio: this.state.bio
      })
        .then(response => {
            this.setState({ userData: response.data.result });
        })
        .catch(error => {
          debugger;
        });
  }

  passUserHandler = (id, user) => {
    this.setState({ 
      name: user.name,
      bio: user.bio,
      userId: id,
      btnText: 'UPDATE' 
    });
  }

  updateUserHandler = () => {
    axios
      .put(`http://localhost:3000/api/users/${this.state.userId}`, {
        name: this.state.name,
        bio: this.state.bio
      })
        .then(response => {
            debugger
        })
        .catch(error => {
          debugger;
        });
  }

  deleteUserHandler = (id) => {
    axios
      .delete(`http://localhost:3000/api/users/${id}`)
        .then(response => {
          this.getRequestHandler();
        })
        .catch(error => {
          debugger;
        });
  }

  render() {
    return (
      <StyledApp>
        <div className="users-wrapper">
          {
            this.state.userData
              ? this.state.userData.map(user => {
                  return (
                      <div key={uuid()} className="user">
                        <h2>{user.name}</h2>
                        <p>{user.bio}</p>
                        <div className="buttons">
                          <button onClick={this.postUserHandler}>Post</button>
                          <button 
                            onClick={() => this.passUserHandler(user.id, {
                              name: user.name,
                              bio: user.bio
                            })}>Update</button>
                          <button onClick={() => this.deleteUserHandler(user.id)}>Delete</button>
                        </div>
                      </div>
                  );
                })
              : null
          }
        </div>
        <form onSubmit={this.toggleHandlers}>
          <input 
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.inputChangeHandler}
            placeholder="Name"
            />
          <input 
            type="text"
            name="bio"
            value={this.state.bio}
            onChange={this.inputChangeHandler}
            placeholder="Bio"
            />
          <button type="submit">{this.state.btnText}</button> 
        </form>
      </StyledApp>
    );
  }
}

export default App;
