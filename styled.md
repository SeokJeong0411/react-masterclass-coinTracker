# STYLED

### 설치

`npm i styled-components`

### 사용법

- 기본 사용법

```
    const Father = styled.div`
        display: flex;
    `;

    const BoxOne = styled.div`
        background-color: teal;
        width: 100px;
        height: 100px;
    `;

    const BoxTwo = styled.div`
        background-color: teal;
        width: 100px;
        height: 100px;
    `;


    <Father>
        <BoxOne />
        <BoxTwo />
    </Father>
```

- 변수 사용

```
    const Father = styled.div`
        display: flex;
    `;

    const Box = styled.div`
        background-color: ${(props) => props.bgColor};
        width: 100px;
        height: 100px;
    `;


    <Father>
        <Box bgColor="teal" />
        <Box bgColor="tomato" />
    </Father>
```

- 확장
  다른 컴포넌트에서 상속받아 사용

```
    const Father = styled.div`
        display: flex;
    `;

    const Box = styled.div`
        background-color: ${(props) => props.bgColor};
        width: 100px;
        height: 100px;
    `;

    const Circle = styled(Box)`
        border-radius: 50px;
    `;

    <Father>
        <Box bgColor="teal" />
        <Circle bgColor="tomato" />
    </Father>
```

- as
  tag를 변경할 수 있음

```
    <Btn>Log In</Btn>
    <Btn as={"a"}>Log In</Btn>
```

- attrs
  require, length, readonly 와 같은 속성을 설정해 줄 수 있음

```
    const Input = styled.input.attrs({ required: true })`
        background-color: tomato;
    `;

    <>
        <Input />
        <Input />
        <Input />
        <Input />
        <Input />
      </>
```

- Theme
  테마를 적용할 수 있도록 변수를 넘겨 줄 수 있음

index.js

```
    import { ThemeProvider } from "styled-components";

    const darkTheme = {
        textColor: "whitesmoke",
        backgroundColor: "#111",
    };

    const lightTheme = {
        textColor: "#111",
        backgroundColor: "whitesmoke",
    };

    <ThemeProvider theme={darkTheme}>
        <App />
    </ThemeProvider>
```

App.js

```
    const Wrapper = styled.div`
        display: flex;
        height: 100vh;
        width: 100vw;
        justify-content: center;
        align-items: center;
        background-color: ${(props) => props.theme.backgroundColor};
    `;

    <Wrapper>
        <Title>asdf</Title>
    </Wrapper>
```
