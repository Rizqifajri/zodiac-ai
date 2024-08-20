
const Skeleton : React.FC = () => {
  return (
    <div className="flex flex-col gap-10">
    {[...Array(5)].map((_, index) => (
      <div key={index} className="border border-gray-800 rounded-md p-5 mb-5">
        <div className="flex items-center gap-5 mb-5">
          <div className="skeleton h-14 w-14 rounded-full"></div>
          <div className="flex flex-col gap-2 w-full">
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="skeleton h-6 w-full"></div>
          <div className="skeleton h-4 w-1/2"></div>
        </div>
        <div className="flex mt-5 gap-2">
          <div className="skeleton h-10 w-32"></div>
        </div>
      </div>
    ))}
  </div>
  )
}

export default Skeleton