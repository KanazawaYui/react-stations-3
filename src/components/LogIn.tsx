import axios from "axios";
import { url } from "../const";
import { useCookies } from "react-cookie";
import { useForm, SubmitHandler } from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
};

const LogIn = () => {
  const [, setCookie] = useCookies();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<FormValues>({
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });

  const logIn: SubmitHandler<any> = async (data) => {
    try {
      await axios
        .post(`${url}/signin`, {
          email: data.email,
          password: data.password,
        })
        .then((res) => {
          setCookie("token", res.data.token);
        });
    } catch (err) {
      console.error("ログイン失敗:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        onSubmit={handleSubmit(logIn)}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">ログイン</h2>

        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          メールアドレス
        </label>
        <input
          id="email"
          aria-label="email"
          type="email"
          autoComplete="email"
          {...register("email", {
            required: "メールアドレスを入力してください",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "正しいメールアドレスの形式で入力してください",
            },
          })}
          className="w-full px-3 py-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email?.message && (
          <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>
        )}

        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          パスワード
        </label>
        <input
          aria-label="pass"
          type="password"
          autoComplete="new-password"
          {...register("password", {
            required: "パスワードを入力してください",
          })}
          className="w-full px-3 py-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.password?.message && (
          <p className="text-red-500 text-sm mb-4">{errors.password.message}</p>
        )}

        <button
          type="submit"
          disabled={!isDirty || !isValid}
          className={`w-full py-2 rounded text-white font-semibold transition ${
            !isDirty || !isValid
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          ログイン
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          アカウントを持っていない方は{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            こちら
          </a>
        </p>
      </form>
    </div>
  );
};

export default LogIn;
