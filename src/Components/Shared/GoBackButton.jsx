/* eslint-disable react/prop-types */

import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';

const GoBackButton = ({ text }) => {
    const navigate = useNavigate();
    const habdleBack = () => {
        navigate(-1);
    }
    return (
        <div>
            <button onClick={habdleBack} className="flex items-center justify-start gap-2 mx-2 text-xl font-bold md:text-2xl md:mx-0 py-7">
                <FaArrowLeft />
                {text}
            </button>
        </div>
    )
}

export default GoBackButton;