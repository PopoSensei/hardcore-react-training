import { FC, ComponentProps } from "react";
import { buttonClass } from "./Button.css";

type Props = ComponentProps<"button"> & {
  variant?: string;
};

const Button: FC<Props> = ({ children, variant, ...rest }) => {
  return (
    <button {...rest} className={buttonClass}>
      {children}
    </button>
  );
};

export default Button;
