import { signIn } from "next-auth/react";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { Button, Form, Input, InputGroup } from "react-daisyui";

type Props = {};

export default function Signin({}: Props) {
  const [email, setEmail] = useState("");
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    signIn("email", { email });
  };
  const handleEmailInput = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup>
        <Input
          type="text"
          className="!rounded-l-md"
          onChange={handleEmailInput}
          value={email}
          placeholder="sample@email.com"
          bordered
        />
        <Button type="submit" className="btn-primary btn-md no-animation rounded-r-md">
          Sign-in
        </Button>
      </InputGroup>
    </Form>
  );
}
