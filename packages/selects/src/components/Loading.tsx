import { Spin } from "antd";

function Loading() {
  return (
    <div className="absolute left-50% top-50% -translate-x-1/2 -translate-y-1/2 text-center">
      <Spin spinning={true} />
    </div>
  );
}

export default Loading;