const themes = {
  light: {
    color: '#000',
    background: '#eee',
  },

  dark: {
    color: '#fff',
    background: '#222',
  },
};

// 创建 React context 赋默认值
const ThemeContext = React.createContext({
  theme: themes.dark,
  toggleTheme: () => {},
});
const UserContext = React.createContext({
  name: 'jsonz',
});

// 用 Consumer的方式获取多个contextValue
const FunctionContext = () => (
  <ThemeContext.Consumer>
    {({theme: {color, background}, toggleTheme}) => {
      return (
        <UserContext.Consumer>
          {user => (
            <React.Fragment>
              <button
                onClick={toggleTheme}
                style={{ color, background }}
              >
                {background}
              </button>
              <p>{user}</p>
            </React.Fragment>
          )}
        </UserContext.Consumer>
      );
    }}
  </ThemeContext.Consumer>
);

const FunctionWrap = () => (
  <React.Fragment>
    <FunctionContext />
  </React.Fragment>
);

// 用class.contextType && this.context 的方式
class ClassContext extends React.Component {
  static contextType = ThemeContext;

  render() {
    const {
      theme: { color, background },
    } = this.context;
    return (
      <React.Fragment>
        <p style={{ color, background }}>{background}</p>
      </React.Fragment>
    );
  }
}

const ClassWrap = () => (
  <React.Fragment>
    <ClassContext />
  </React.Fragment>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.light,
      toggleTheme: () =>
        this.setState(state => ({
          theme: state.theme === themes.dark ? themes.light : themes.dark,
        })),
    };
  }

  render() {
    return (
      <ThemeContext.Provider value={this.state}>
        <UserContext.Provider value={'jsonz1993'}>
          <ClassWrap />
          <FunctionWrap />
        </UserContext.Provider>
      </ThemeContext.Provider>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('container'));