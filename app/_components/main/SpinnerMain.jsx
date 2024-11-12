import { Spinner } from "@phosphor-icons/react/dist/ssr";

const SpinnerMain = () => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <Spinner weight="bold" className="size-8 animate-spin" />
    </div>
  );
};
export default SpinnerMain;
