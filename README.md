# React-Study
> Results that I studied in React Study

**react-network**
>studied about react network using fetch  
>GET/POST/POST IMAGE
* sample code for GET
<pre><code>_getFetch = () => {
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
  }</code></pre>
  
  
**react-socket**
>made a chatting using socketio
<pre><code>const socket = socketio.connect('https://reactsocketiomo.herokuapp.com/')</code></pre>
