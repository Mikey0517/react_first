import React from 'react'

class Clock extends React.Component {
  constructor (props){
    super ();
    this.state = {
      date : new Date()
    }
  }

  componentDidMount (){
    this.timeId = setInterval (
      () => this.tick(),
      1000
    )
  }

  componentWillMount (){
    clearInterval(this.timeId)
  }

  tick (){
    this.setState ({
      date : new Date()
    })
  }

  render() {
      return (
        <div>Time : {this.state.date.toLocaleTimeString()}</div>
      )
  }
}

export default Clock