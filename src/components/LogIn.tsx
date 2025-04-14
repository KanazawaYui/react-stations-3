import "../assets/css/LogIn.scss";

const LogIn = () => {
  return (
    <div className="logIn">
      <h2>ログイン</h2>
      <label className="mailLabel">メールアドレス</label>
      <input aria-label="mail" className="mailInput" type="email"></input>
      <label className="passwordLabel">パスワード</label>
      <input
        aria-label="pass"
        className="passwordInput"
        type="password"
      ></input>
      <button className="logInButton">ボタン</button>
    </div>
  );
};

export default LogIn;
