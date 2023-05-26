import Forbidden from '@/pages/403';

interface Props {
  isPermission?: boolean;
  children: JSX.Element;
}

function BasicContent(props: Props) {
  const { isPermission, children} = props;

  return (
    <div className="min-w-980px h-full p-10px box-border overflow-auto">
      {
        isPermission !== false &&
        <div
          id="content"
          className={`
            relative
            box-border
            px-5
          `}
        >
            { children }
        </div>
      }
      {
        isPermission === false &&
        <Forbidden />
      }
    </div>
  );
}

export default BasicContent;