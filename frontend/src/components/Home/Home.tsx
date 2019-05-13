import React, { Component } from 'react';
import Child from './Child';

interface HomeProps {
  title: number
}

interface HomeState {
  title: number,
}

export default class Home extends Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      title: 0,
    };
  }

  handleInputChange(e: any) {
    this.setState({ title: e });
  }

  render() {
    const { title } = this.state;
    return (
      <>
      <h2>Title is: {this.state.title}</h2>
      <Child title={title} handleInputChange={this.handleInputChange} />
      </>
    );
  }


}
