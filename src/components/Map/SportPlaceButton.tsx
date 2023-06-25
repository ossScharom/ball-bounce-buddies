import React, { HtmlHTMLAttributes, useState } from "react";
import { Button, ButtonProps } from "react-daisyui";

type Props = { onClick: () => void; text: string };

export default function SportPlaceButton({
  onClick,
  text,
  loading,
  disabled,
}: Props & ButtonProps) {
  return (
    <Button
      disabled={disabled}
      className="btn-primary btn-sm w-full"
      onClick={() => {
        onClick();
      }}
    >
      {loading ? <span className="loading loading-ball" /> : text}
    </Button>
  );
}
