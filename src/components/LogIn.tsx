import "../assets/css/LogIn.scss";

const LogIn = () => {
  return (
    <div className="logIn">
      <h2>ログイン</h2>
      <label className="mailLabel">メールアドレス</label>
      <input aria-label="mail" className="mailInput" type="email" />
      <label className="passwordLabel">パスワード</label>
      <input aria-label="pass" className="passwordInput" type="password" />
      <button className="logInButton">ボタン</button>
      <p>
        アカウントを持っていない方は<a>こちら</a>
      </p>
    </div>
  );
};

export default LogIn;
