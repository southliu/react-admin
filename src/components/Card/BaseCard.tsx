import { HTMLAttributes } from "react";

function BaseCard(props: HTMLAttributes<unknown>) {
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
        rounded-3
        ${className}
      `}
    >
      { children }
    </div>
  );
}

export default BaseCard;
