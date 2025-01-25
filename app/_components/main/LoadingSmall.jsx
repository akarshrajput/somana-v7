import { Spinner } from "@phosphor-icons/react/dist/ssr";

const LoadingSmall = () => {
  return (
    <div>
      <Spinner weight="bold" className="size-8 animate-spin" />
    </div>
  );
};
export default LoadingSmall;
