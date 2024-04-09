import { ReloadIcon } from '@radix-ui/react-icons';

const Loading = () => {
  return (
    <div className="h-screen md:-mt-16 flex justify-center items-center">
      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
    </div>
  );
};

export default Loading;
