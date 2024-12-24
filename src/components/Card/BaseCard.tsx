import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<unknown> {
}

function BaseCard(props: Props) {
  const { children, className } = props;

  return (
    <div
      { ...props }
      id="card"
      className={`
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

export default BaseCard;
