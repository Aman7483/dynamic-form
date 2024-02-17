import React, { useState } from 'react';

const FormPreview = ({ formFields }) => {
  const [inputValues, setInputValues] = useState({});

  const handleInputChange = (fieldName, value) => {
    setInputValues({ ...inputValues, [fieldName]: value });
  };

  return (
    <form>
      {formFields.map((field, index) => {
        return (
          <div key={index}>
            <label htmlFor={field.label}>{field.label}</label>
            {field.type === 'text' ? (
              <input
                type="text"
                id={field.label}
                value={inputValues[field.label] || ''}
                onChange={(e) => handleInputChange(field.label, e.target.value)}
              />
            ) : field.type === 'textarea' ? (
              <textarea
                id={field.label}
                value={inputValues[field.label] || ''}
                onChange={(e) => handleInputChange(field.label, e.target.value)}
              />
            ) : field.type === 'dropdown' ? (
              <select
                id={field.label}
                value={inputValues[field.label] || ''}
                onChange={(e) => handleInputChange(field.label, e.target.value)}
              >
                {field.options.map((option, optionIndex) => (
                  <option key={optionIndex} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : field.type === 'checkbox' ? (
              <div>
                <input
                  type="checkbox"
                  id={field.label}
                  checked={inputValues[field.label] || false}
                  onChange={(e) => handleInputChange(field.label, e.target.checked)}
                />
                <label htmlFor={field.label}>{field.label}</label>
              </div>
            ) : field.type === 'radio' ? (
              <div>
                {field.options.map((option, optionIndex) => (
                  <div key={optionIndex}>
                    <input
                      type="radio"
                      id={option}
                      name={field.label}
                      value={option}
                      checked={inputValues[field.label] === option}
                      onChange={(e) => handleInputChange(field.label, e.target.value)}
                    />
                    <label htmlFor={option}>{option}</label>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        );
      })}
    </form>
  );
};

export default FormPreview;
