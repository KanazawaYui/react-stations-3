import defaultIcon from "../assets/icon.png";
import camera from "../assets/camera.png";
import "../assets/css/SignUp.scss";
import Compressor from "compressorjs";
import { useState } from "react";
import axios from "axios";
import { url } from "../const";
import { useForm, SubmitHandler } from "react-hook-form";

type FormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUp = () => {
  const [icon, setIcon] = useState(defaultIcon);
  const [, setToken] = useState<string | null>(null);
  const [iconFormData, setIconFormData] = useState<File>();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<FormValues>({
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
    mode: "onChange",
  });

  const password = watch("password");

  const changeIcon = (e: any) => {
    const file = e.target.files[0];

    new Compressor(file, {
      quality: 0.6,
      convertSize: 100000,
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

  const createAccount: SubmitHandler<any> = async (data) => {
    try {
      // アカウント作成してトークン取得
      const res = await axios.post(`${url}/users`, {
        name: data.name,
        email: data.email,
        password: data.password,
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
      <form className="signUpForm" onSubmit={handleSubmit(createAccount)}>
        <div className="iconSetting">
          <img src={icon} alt="icon" className="icon" />
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
          autoComplete="name"
          {...register("name", { required: "名前を入力してください" })}
        />
        {errors.name?.message && (
          <p className="error-message">{errors.name.message}</p>
        )}

        <label className="emailLabel">メールアドレス</label>
        <input
          id="email"
          aria-label="email"
          className="emailInput"
          type="email"
          autoComplete="email"
          {...register("email", {
            required: "メールアドレスを入力してください",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "正しいメールアドレスの形式で入力してください",
            },
          })}
        />
        {errors.email?.message && (
          <p className="error-message">{errors.email.message}</p>
        )}

        <label className="passwordLabel">パスワード</label>
        <input
          aria-label="pass"
          className="passwordInput"
          type="password"
          autoComplete="new-password"
          {...register("password", {
            required: "パスワードを入力してください",
          })}
        />
        {errors.password?.message && (
          <p className="error-message">{errors.password.message}</p>
        )}

        <label className="passwordLabel">パスワード確認</label>
        <input
          aria-label="confirm-pass"
          className="passwordInput"
          type="password"
          autoComplete="new-password"
          {...register("confirmPassword", {
            required: "確認用パスワードを入力してください",
            validate: (value) =>
              value === password.toString() || "パスワードが一致しません",
          })}
        />
        {errors.confirmPassword?.message && (
          <p className="error-message">{errors.confirmPassword.message}</p>
        )}

        <button
          className="signUpButton"
          type="submit"
          disabled={!isDirty || !isValid}
        >
          新規作成
        </button>
      </form>

      <p>
        既にアカウントを持っている方は<a>こちら</a>
      </p>
    </div>
  );
};

export default SignUp;
