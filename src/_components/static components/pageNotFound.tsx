const pageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src="/404.svg" alt="Page not found" className="w-2xl" />
      <p className="mt-4 text-gray-500">صفحه مورد نظر پیدا نشد!</p>
    </div>
  );
};

export default pageNotFound;
