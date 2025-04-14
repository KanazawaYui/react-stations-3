import icon from "../assets/icon.png";
import camera from "../assets/camera.png";
import "../assets/css/SignUp.scss";

const SignUp = () => {
  return (
    <div className="signUp">
      <h2>新規アカウント作成</h2>
      <div className="icon-setting">
        <img src={icon} alt="icon" className="icon" height="120" width="120" />
        <label>
          <img src={camera} alt="camera" className="camera" />
          <input className="fileInput" type="file" />
        </label>
      </div>
      <label className="mailLabel">メールアドレス</label>
      <input aria-label="mail" className="mailInput" type="email"></input>
      <label className="passwordLabel">パスワード</label>
      <input
        aria-label="pass"
        className="passwordInput"
        type="password"
      ></input>
      <label className="passwordLabel">パスワード</label>
      <input
        aria-label="pass"
        className="passwordInput"
        type="password"
      ></input>
      <button className="signUpButton">新規作成</button>
      <p>
        既にアカウントを持っている方は<a>こちら</a>
      </p>
    </div>
  );
};

export default SignUp;
