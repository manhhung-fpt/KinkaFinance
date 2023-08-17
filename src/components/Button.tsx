import * as React from "react"
import PropTypes from "prop-types";
import { Link } from "gatsby"

const propTypes = {
    label: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
}
  const Button :
    React.FC<PropTypes.InferProps<typeof propTypes>>= ({label, link, size}) => {
    return (
        <Link to={link} className={`button flex items-center justify-center rounded-md bg-[#358b84] text-white font-semibold  ${
            size === "lg" ? "px-4 py-3 text-body-md" : "px-4 py-2.5 text-body-sm"
          }`}>{label}</Link>
    )
    }

export default Button;