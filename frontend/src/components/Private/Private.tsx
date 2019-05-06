import React from 'react';
import axios from "axios";
import './Private.css';
import * as session from '../../session';

interface PrivateProps {
  email: string;
  password: string;
}

const loggedOut = () => {
  return (
    <h2>Logged Out</h2>
  )
}

export default class Private extends React.Component<PrivateProps> {

  public state = {
    email: this.props.email,
    password: this.props.password,
    isRequesting: false,
    isLoggedIn: true,
    data: [],
    error: ""
  };

  componentDidMount() {
    console.log('Private content rendered.');
  }

  componentWillUnmount() {
    this.forceUpdate();
  }

  render() {
    return (
      <div className="App-private">
        {this.state.isLoggedIn ? (
          <>
            <div className="pvt-data">
              Server test data:
            <ul>
                {this.state.data.map((item: App.Item, index: number) => <li key={index}>name: {item.name} / value: {item.value}</li>)}
              </ul>

            </div>
            <button disabled={this.state.isRequesting} onClick={this.getTestData}>Get test data</button>
            <button disabled={this.state.isRequesting} onClick={this.logout}>Log out</button>
          </>
        ) : (
            <h2>Refresh to return home.</h2>
          )}

        
      </div>
    )
  }

  private logout = (): any => {
    session.clearSession();
    this.setState({ isLoggedIn: false });
    this.forceUpdate();
    return loggedOut();
  };

  private getTestData = async (): Promise<void> => {
    try {
      this.setState({ error: "" });
      const response = await axios.get<App.Item[]>("/api/items", { headers: session.getAuthHeaders() });
      this.setState({ data: response.data });
    } catch (error) {
      this.setState({ error: "Something went wrong" });
    } finally {
      this.setState({ isRequesting: false });
    }
  }
}