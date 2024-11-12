const BaseButton = ({ className, children }) => {
  return (
    <button
      className={`${className} w-fit bg-black text-white font-medium py-2 px-4 rounded-md`}
    >
      {children}
    </button>
  );
};
export default BaseButton;
