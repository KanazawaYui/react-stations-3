import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import LogIn from "./LogIn";

describe("LogIn Component", () => {
  it("renders the LogIn form with email, password, and button", () => {
    render(<LogIn />);

    // メールアドレスとパスワードのラベルが表示されていることを確認
    expect(screen.getByText("メールアドレス")).toBeInTheDocument();
    expect(screen.getByText("パスワード")).toBeInTheDocument();

    // メールとパスワードの入力フィールドが存在することを確認
    expect(screen.getByRole("textbox", { name: "mail" })).toBeInTheDocument();
    // ボタンが表示されていることを確認
    expect(screen.getByRole("button", { name: "ボタン" })).toBeInTheDocument();
  });
});
