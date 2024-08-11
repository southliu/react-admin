import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<unknown> {
}

function BasicCard(props: Props) {
  const { children, className } = props;

  return (
    <div
      { ...props }
      id="card"
      className={`
        min-w-980px
        h-full
        box-border
        overflow-auto
        relative
        box-border
        px-5
        py-3
        rounded-5
        ${className}
      `}
    >
      { children }
    </div>
  );
}

export default BasicCard;
