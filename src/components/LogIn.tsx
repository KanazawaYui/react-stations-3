import "../assets/css/LogIn.scss";
import { useForm, SubmitHandler } from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
};

const LogIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<FormValues>({
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });

  const logIn: SubmitHandler<any> = (data) => {
    console.log(data);
  };

  return (
    <div className="logIn">
      <h2>ログイン</h2>
      <form className="signUpForm" onSubmit={handleSubmit(logIn)}>
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
        <button
          className="logInButton"
          type="submit"
          disabled={!isDirty || !isValid}
        >
          ログイン
        </button>
        <p>
          アカウントを持っていない方は<a>こちら</a>
        </p>
      </form>
    </div>
  );
};

export default LogIn;
