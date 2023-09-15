import React, { useContext } from 'react'
import './styles.css'
import { AppContext } from '../../contexts/AppContext'
import SuccessAnimation from '../../assets/animations/Success';
import DeniedAnimation from '../../assets/animations/Denied';
import WarningAnimation from '../../assets/animations/Warning';

export default function Alert() {
    const { showAlert, showAlertMessage, showAlertIcon } = useContext(AppContext);

    return (
        <>
            {showAlert &&
                <div className='alert-container'>
                    <div className="alert-content">
                        {
                            showAlertIcon == 'success' ?
                                <SuccessAnimation />
                                : showAlertIcon == 'denied' ?
                                    <DeniedAnimation />
                                    : showAlertIcon == 'warning' ?
                                        <WarningAnimation />
                                        : null
                        }
                        <p className="alert-message">{showAlertMessage !== "" ? showAlertMessage : "Nenhuma mensagem de alerta!"}</p>
                    </div>
                </div>
            }
        </>
    )
}
