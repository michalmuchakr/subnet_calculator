import React, { useState } from "react";
import "styles/form.scss";
import InputElement from "components/shared/input-element.jsx";
import exportToFileURL from "controllers/export-to-file.jsx";
import validatorIP from "controllers/ip-validator";
import calculator from "controllers/calculator";

const Form = () => {
  const [ipAddres, setIpAddres] = useState("");
  const [errors, setErrors] = useState([]);
  const [isDownloadReady, setIsDownloadReady] = useState(false);
  const [result, setResult] = useState("");

  const showError = (errMsg = "Not valid format") => {
    setErrors([errMsg]);
  };

  const cleanError = () => {
    setErrors([]);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const isValidIP = validatorIP.checkIP(ipAddres);

    if (!isValidIP) {
      showError();
      return true;
    }
    cleanError();

    // start calculation
    const result = calculator.init(ipAddres);
    setIsDownloadReady(true);
    setResult(result);
  };

  const handleInputChange = (e) => {
    setIpAddres(e.target.value);
  };

  const handleSaveToFile = (e) => {
    e.preventDefault();
    exportToFileURL(result);
  };

  return (
    <form className="form">
      <div className="form__element">
        {errors.length > 0 && (
          <div className="form__error-msg">
            <ul className="form__error-msg__list">
              {errors.map((err) => (
                <li className="form__error-msg__list__item">{err}</li>
              ))}
            </ul>
          </div>
        )}
        <label className="form__label" htmlFor="ipAdress">
          <span className="form__descript">
            Wprowadź adres IP hosta lub sieci:
          </span>
          <span className="form__in_btn">
            <input
              className="form__input"
              type="text"
              id="ipAdress"
              label="ipAdress"
              placeholder="np: 192.168.1.1/24"
              onChange={(e) => handleInputChange(e)}
            />
            <button
              className="form__button"
              onClick={(e) => handleFormSubmit(e)}
            >
              oblicz
            </button>
            {isDownloadReady && (
              <button
                className="form__button"
                onClick={(e) => handleSaveToFile(e)}
              >
                pobierz
              </button>
            )}
          </span>
        </label>
      </div>

      <h2 className="form__sub-title">Rezultaty</h2>

      <InputElement
        name=""
        label="Adres sieci"
        readOnly={true}
        value={result.netAdressFormatedString}
      />
      <InputElement
        name=""
        label="Klasę sieci"
        readOnly={true}
        value={result.adressClass}
      />
      <InputElement
        name=""
        label="Pełną maskę sieci"
        readOnly={true}
        value={result.fullMaskAdressFormatedString}
      />
      <InputElement
        name=""
        label="Adres broadcast"
        readOnly={true}
        value={result.broadcastAdressFormatedString}
      />
      <InputElement
        name=""
        label="Pierwszy adres hosta"
        readOnly={true}
        value={result.firstHostAdress}
      />
      <InputElement
        name=""
        label="Ostatni adres hosta"
        readOnly={true}
        value={result.lastHostAdress}
      />
      <InputElement
        name=""
        label="Maksymalna liczba hostów podsieci"
        readOnly={true}
        value={result.maxAmmountOfHosts}
      />
    </form>
  );
};

export default Form;
