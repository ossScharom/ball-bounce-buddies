import classNames from "classnames";
import React, { HtmlHTMLAttributes, useState } from "react";
import { Button, ButtonProps } from "react-daisyui";

type Props = { onClick: () => void; text: string };

export default function SportPlaceButton({
  onClick,
  text,
  loading,
  disabled,
  className,
}: Props & ButtonProps) {
  return (
    <Button
      disabled={disabled}
      className={classNames("btn-primary btn-sm w-full", className)}
      onClick={() => {
        onClick();
      }}
    >
      {loading ? <span className="loading loading-ball" /> : text}
    </Button>
  );
}
