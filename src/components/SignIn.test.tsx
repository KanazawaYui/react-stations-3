import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SignIn from "./SignIn";

describe("SignIn Component", () => {
  it("renders the SignIn form with email, password, and button", () => {
    render(<SignIn />);

    // メールアドレスとパスワードのラベルが表示されていることを確認
    expect(screen.getByText("メールアドレス")).toBeInTheDocument();
    expect(screen.getByText("パスワード")).toBeInTheDocument();

    // メールとパスワードの入力フィールドが存在することを確認
    expect(screen.getByRole("textbox", { name: "mail" })).toBeInTheDocument();
    // ボタンが表示されていることを確認
    expect(screen.getByRole("button", { name: "ボタン" })).toBeInTheDocument();
  });
});
