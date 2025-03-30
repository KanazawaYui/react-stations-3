import "./SignIn.scss";

const SignIn = () => {
  return (
    <div className="signIn">
      <label className="mailLabel">メールアドレス</label>
      <input className="mailInput" type="email"></input>
      <label className="passwordLabel">パスワード</label>
      <input className="passwordInput" type="password"></input>
      <button className="signInButton">ボタン</button>
    </div>
  );
};

export default SignIn;
