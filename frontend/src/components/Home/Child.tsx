import React, { Component } from 'react'

interface ChildProps {
  title: number,
  handleInputChange: Function
}

interface ChildState {
  number: number
}

export default class Child extends Component<ChildProps, ChildState> {
  constructor(props: ChildProps) {
    super(props);

  }

  componentWillMount() {
    this.setState({ number: 5 });
  }

  render() {
    return (
      <div>
        <div className="child">
          <input onChange={this.updateInputValue} type="text" value={this.state.number} placeholder="Enter a number" id="num" />
          <button onClick={() => this.props.handleInputChange(this.state.number)}>Send to Parent</button>
        </div>
      </div>
    )
  }

  private updateInputValue = (e: any) => {
    this.setState({
      number: e.target.value
    });
  }

  private getNumber = (): number => {
    console.log(this.state.number);
    // set state to 4
    return this.state.number;
  }
}
