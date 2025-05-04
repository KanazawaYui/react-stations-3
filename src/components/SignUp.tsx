import defaultIcon from "../assets/icon.png";
import camera from "../assets/camera.png";
import "../assets/css/SignUp.scss";
import Compressor from "compressorjs";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../const";
import { useForm, SubmitHandler } from "react-hook-form";

const SignUp = () => {
  const [icon, setIcon] = useState(defaultIcon);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordAgain, setPasswordAgain] = useState<string>("");
  const [, setToken] = useState<string | null>(null);
  const [iconFormData, setIconFormData] = useState<File>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log("errors: ", errors);

  const changeIcon = (e: any) => {
    const file = e.target.files[0];

    new Compressor(file, {
      quality: 0.6,
      convertSize: 100000,
      // The compression process is asynchronous,
      // which means you have to access the `result` in the `success` hook function.
      success(result) {
        const formData = new File([result], file.name, {
          type: result.type,
        });
        setIconFormData(formData);

        setIcon(URL.createObjectURL(formData));
      },
      error(err) {
        console.log(err.message);
      },
    });
  };

  const inputName = (e: any) => {
    setName(e.target.value);
  };

  const inputEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const inputPassword = (e: any) => {
    setPassword(e.target.value);
  };

  const inputPasswordAgain = (e: any) => {
    setPasswordAgain(e.target.value);
  };

  const createAccount = async () => {
    try {
      // アカウント作成してトークン取得
      const res = await axios.post(`${url}/users`, {
        name,
        email,
        password,
      });
      const newToken = res.data.token;
      setToken(newToken);
      // アイコンがあるならアップロード
      if (iconFormData) {
        const formData = new FormData();
        formData.append("icon", iconFormData);
        await axios.post(`${url}/uploads`, formData, {
          headers: {
            Authorization: `Bearer ${newToken}`,
          },
        });
      }
    } catch (err) {
      console.error("アカウント作成またはアイコンアップロード失敗:", err);
    }
  };

  return (
    <div className="signUp">
      <h2>新規アカウント作成</h2>
      <div className="icon-setting">
        <img src={icon} alt="icon" className="icon" height="120" width="120" />
        <label>
          <img src={camera} alt="camera" className="camera" />
          <input
            className="fileInput"
            type="file"
            accept=".jpg, .png"
            onChange={changeIcon}
          />
        </label>
      </div>
      <label className="nameLabel">名前</label>
      <input
        id="name"
        aria-label="name"
        className="nameInput"
        type="string"
        {...register("name", {
          required: "名前を入力してください",
        })}
        onChange={inputName}
        value={name}
      />
      <label className="emailLabel">メールアドレス</label>
      <input
        aria-label="email"
        className="emailInput"
        type="email"
        onChange={inputEmail}
        value={email}
      />
      <label className="passwordLabel">パスワード</label>
      <input
        aria-label="pass"
        className="passwordInput"
        type="password"
        onChange={inputPassword}
        value={password}
      />
      <label className="passwordLabel">パスワード</label>
      <input
        aria-label="pass"
        className="passwordInput"
        type="password"
        onChange={inputPasswordAgain}
        value={passwordAgain}
      />
      <button className="signUpButton" onClick={createAccount}>
        新規作成
      </button>
      <p>
        既にアカウントを持っている方は<a>こちら</a>
      </p>
    </div>
  );
};

export default SignUp;
