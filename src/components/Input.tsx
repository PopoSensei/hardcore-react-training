import { FC, ComponentProps } from "react";
import { inputClass } from "./Input.css";

type Props = ComponentProps<"input"> & {
  variant?: string;
};

const Input: FC<Props> = ({ children, variant, ...rest }) => {
  return <input {...rest} className={inputClass} />;
};

export default Input;
