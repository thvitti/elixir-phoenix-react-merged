import {useState} from 'react';

export default function useForm(initial){

    const [values, setValues] = useState(initial);

    function handleChange(e) {
      setValue(e.target.getAttribute('name'),
        e.target.value);
    }

    function setValue(key, value) {
      setValues({
        ...values,
        [key]: value,
      });


    }

    function clearForm(){
      setValues(initial);
    }

    return {
      values,
      handleChange,
      clearForm
    };
  }
