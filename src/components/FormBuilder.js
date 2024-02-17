import React, { useState } from 'react';
import '../index.css'; // Import the CSS file for FormBuilder
import Checkbox from './Checkbox';
import FormPreview from './FormPreview';

const FormBuilder = () => {
  const [formFields, setFormFields] = useState([]);
  const [fieldErrors, setFieldErrors] = useState([]);

  const addFormField = () => {
    const newField = { type: 'text', label: '', options: [], value: '' };
    setFormFields([...formFields, newField]);
    setFieldErrors([...fieldErrors, '']);
  };

  const removeFormField = (index) => {
    if (window.confirm("Are you sure you want to remove this field?")) {
      const newFormFields = [...formFields];
      newFormFields.splice(index, 1);
      setFormFields(newFormFields);

      const newFieldErrors = [...fieldErrors];
      newFieldErrors.splice(index, 1);
      setFieldErrors(newFieldErrors);
    }
  };

  const handleFieldChange = (index, fieldName, value) => {
    const newFormFields = [...formFields];
    const updatedField = { ...newFormFields[index] };
    updatedField[fieldName] = value;
    newFormFields[index] = updatedField;
    setFormFields(newFormFields);
  };

  const addRadioOption = (index) => {
    const newFormFields = [...formFields];
    newFormFields[index].options.push('');
    setFormFields(newFormFields);
  };

  const saveConfiguration = () => {
    const jsonConfig = JSON.stringify(formFields);
    localStorage.setItem('formConfig', jsonConfig);
    console.log('Saved configuration:', jsonConfig);
    alert('Form configuration saved successfully!');
  };

  const loadConfiguration = () => {
    const loadedConfig = JSON.parse(localStorage.getItem('formConfig')) || [];
    setFormFields(loadedConfig);
    console.log('Loaded configuration:', loadedConfig);
    alert('Form configuration loaded successfully!');
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  // Validate form fields
  const isValid = validateForm();

  if (isValid) {
    console.log('Form submitted:', formFields);
    alert('Form submitted successfully!');
  } else {
    alert('Form is not valid. Please fill in all required fields.');
  }
};

const validateForm = () => {
  // Check if any required fields are empty
  const emptyFields = formFields.filter((field) => field.type !== 'checkbox' && field.type !== 'radio' && field.label === '');

  if (emptyFields.length > 0) {
    return false;
  }

  // Additional validation logic can be added here

  return true;
};

  return (
    <div className="form-builder-container">
      <div className="form-builder">
        <h2>Form Builder</h2>
        <div className="form-fields">
          {formFields.map((field, index) => (
            <div key={index} className="form-field">
              <label>Label:</label>
              <input
                type="text"
                value={field.label}
                onChange={(e) => handleFieldChange(index, 'label', e.target.value)}
              />
              <label>Type:</label>
              <select
                value={field.type}
                onChange={(e) => handleFieldChange(index, 'type', e.target.value)}
              >
                <option value="text">Text Input</option>
                <option value="textarea">Text Area</option>
                <option value="dropdown">Dropdown</option>
                <option value="checkbox">Checkbox</option>
                <option value="radio">Radio Button</option>
              </select>
              {field.type === 'dropdown' && (
                <div>
                  <label>Options:</label>
                  {field.options.map((option, optionIndex) => (
                    <div key={optionIndex}>
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...field.options];
                          newOptions[optionIndex] = e.target.value;
                          handleFieldChange(index, 'options', newOptions);
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newOptions = [...field.options];
                          newOptions.splice(optionIndex, 1);
                          handleFieldChange(index, 'options', newOptions);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const newOptions = [...field.options, ''];
                      handleFieldChange(index, 'options', newOptions);
                    }}
                  >
                    Add Option
                  </button>
                </div>
              )}
              {field.type === 'checkbox' && (
                <Checkbox
                  label="Check this box"
                  checked={field.value}
                  onChange={(e) => handleFieldChange(index, 'value', e.target.checked)}
                />
              )}
              {field.type === 'radio' && (
                <div>
                  <label>Options:</label>
                  {field.options.map((option, optionIndex) => (
                    <div key={optionIndex}>
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...field.options];
                          newOptions[optionIndex] = e.target.value;
                          handleFieldChange(index, 'options', newOptions);
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newOptions = [...field.options];
                          newOptions.splice(optionIndex, 1);
                          handleFieldChange(index, 'options', newOptions);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addRadioOption(index)}
                  >
                    Add Option
                  </button>
                </div>
              )}
              <button type="button" onClick={() => removeFormField(index)}>Remove Field</button>
            </div>
          ))}
        </div>
        <button type="button" onClick={addFormField}>Add Field</button>
        <button type="button" onClick={saveConfiguration}>Save Configuration</button>
        <button type="button" onClick={loadConfiguration}>Load Configuration</button>
        <button type="submit" onClick={handleSubmit}>Submit Form</button>
      </div>
      <div className="form-preview">
        <h2>Form Preview</h2>
        <div className="preview-container">
          <FormPreview formFields={formFields} fieldErrors={fieldErrors} /> 
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;
