

interface myerror {
  error: boolean;
}

const ErrorPage:React.FC<myerror> = ({error}) => {
  return (
      <div>
          {error &&  (
              <h1 className="text-center text-sm text-red-500">
                 Sorry Something went wrong
          </h1>
          )}
    </div>
  )
}

export default ErrorPage