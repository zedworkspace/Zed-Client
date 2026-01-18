import { ThreeDot } from "react-loading-indicators"

interface IBg {
  color:string
}

const ButtonLoading = ({color}:IBg) => {
  return (
    <ThreeDot color={color} size="small" text="" textColor={color} />
  )
}

export default ButtonLoading
