import { useParams } from 'react-router-dom';

function Dynamic() {
  const { id } = useParams();

  return (
    <div>id: { id }</div>
  );
}

export default Dynamic;
