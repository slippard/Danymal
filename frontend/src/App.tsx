import axios from "axios";
import * as React from 'react';
import './App.css';
import * as session from './session';
import logo from './logo.png';
import Private from './components/Private/Private';

export interface AppState {
  email: string;
  password: string;
  isRequesting: boolean;
  isLoggedIn: boolean;
  data: App.Item[];
  error: string;
}

class App extends React.Component<{}, AppState> {
  public state = {
    email: "",
    password: "",
    isRequesting: false,
    isLoggedIn: false,
    data: [],
    error: ""
  };

  public componentDidMount() {
    this.setState({ isLoggedIn: session.isSessionValid() });
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome</h1>
        </header>
        <div className="App-error">{this.state.error}</div>
        {this.state.isLoggedIn ? (
          <Private email={this.state.email} password={this.state.password}/>
        ) : (
          <div className="App-login">
          <p>demo@email.com</p>
          <p>my-password</p>
            <input
              disabled={this.state.isRequesting}
              placeholder="email"
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ email: e.target.value })}
            />
            <input
              disabled={this.state.isRequesting}
              placeholder="password"
              type="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ password: e.target.value })}
            />
            <button disabled={this.state.isRequesting} onClick={this.handleLogin}>Log in</button>
          </div>
        )}
      </div>
    );
  }

  private handleLogin = async (): Promise<void> => {
    const { email, password } = this.state;
    try {
      this.setState({ error: "" });
      this.setState({ isRequesting: true });
      const response = await axios.post<{ token: string; expiry: string }>("/api/users/login", { email, password });
      const { token, expiry } = response.data;
      session.setSession(token, expiry);
      this.setState({ isLoggedIn: true });
    } catch (error) {
      this.setState({ error: "Invalid email or password, please try again." });
    } finally {
      this.setState({ isRequesting: false });
    }
  };

  
}

export default App;
