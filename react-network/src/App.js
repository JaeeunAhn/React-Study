import React from 'react';
import logo from './logo.svg';
import './App.css';
import { resolve } from 'dns';

// state를 쓸 예정이기 때문에 App.js를 class component로 바꿔줌
class App extends React.Component {
  state = {
    image : "", // input file 정보가 담기는 곳
    title : "", // input title 정보가 담기는 곳
    content: "", // input content 정보가 담기는 곳
    imageURL: "" // response 정보가 담기는 곳
  }

  // _ 를 쓰는게 내부에서 사용할 때는 구분하기 위해!
  _getFetch = () => {
    fetch(`https://reactservermo.herokuapp.com/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        'Accept':'application/json',
      },
      mode:"cors", // cross origin, 명시적으로 막아주는것!
    })
    .then((response) => {
      return response.json() // json parsing 해서 다음 then 으로 넘겨주기!
    })
    .then((response) => {
      console.log(response)
        this.setState({
          result : response.data.reactMessage
        })
    })
    // error 핸들링 해주기!
    .catch((err) => {
      console.log(err)
    })
  }

  _postFetch = () => {
    fetch(`https://reactservermo.herokuapp.com/image`, {
        method: "POST",
        headers:{  
          "Content-Type": "application/json;charset=UTF-8",
          'Accept': 'application/json',
          },
        mode:"cors",
        body: JSON.stringify({ // fetch 특징
            title : this.state.titleValue,
            content : this.state.contentValue,
        }),
      })
      .then((response) => {
         return response.json()
        })
      .then((response) =>{
        console.log(response)
        this.setState({
            result : response.data.reactMessage
        })
      })
      .catch((err) => {
          console.log(err)
      })
}

_postImageFetch = () => {
    const data = new FormData()
    data.append('image',this.state.image)
    data.append('title',this.state.title)
    data.append('content',this.state.content)
    console.log("gy")
    fetch(`https://reactservermo.herokuapp.com/image`, {
        method: "POST",
        // 헤더를 명시해주면 오류가 뜸,,! 이유는 모르겠음,, 빼고 해주기!
        // headers:{  
        //     "Content-Type": "multipart/form-data",
        //     },
        body: data,
        })
        .then(response => response.json())
        .then(response => {
           console.log(response)
           this.setState({imageURL:response.data.result.images})
        })
}

_handleSubmit = (event) => {
    // this._postFetch()
    this._postImageFetch() 
    event.preventDefault(); // form 기능 막기
}

_handleChange = (event) => {
    const { target: { name, value } } = event // 비구조화 할당
    if (name == 'image') {
        this.setState({[name]: event.target.files[0]}); // 파일 형태로 받을거닊까
    }else {
        this.setState({[name] : value}) // dynamic key
        console.log(this.state.value)
    }
}

render() {
    return (
        <div>
            리액트 네트워크 시작!!
            <button onClick={this._getFetch}>GET 하기</button> <br />
            <form onSubmit={this._handleSubmit}>
                <p>image</p>
                <input name="image" type="file" onChange={this._handleChange} />
                <p>title</p>
                <input type="text" name="title" value={this.state.title} onChange={this._handleChange} />
                <p>content</p>
                <input type="text" name="content" value={this.state.content} onChange={this._handleChange} />
                <input type="submit" value="POST 하기" />
            </form>
            { this.state.imageURL.length > 0 && <img src={this.state.imageURL} /> } 
        </div>
    )
}
}

//&& : 앞에가 true 면 뒤에가 뿅 하고 나타남!!

export default App;
