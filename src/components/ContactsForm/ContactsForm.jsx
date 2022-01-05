import { useState } from "react";
import PropTypes from 'prop-types';
import s from './ContactsForm.module.css'

export default function ContactsForm ({onSubmit}) {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const handleChange = evt => {
        const {name, value} = evt.target

        switch(name) {
          case 'name' : 
            setName(value);
            break;
            
          case 'number' :
            setNumber(value);
            break;

          default :
            return;
        }
    }

    const  handleSubmit = evt => {
        evt.preventDefault();
        onSubmit(name, number);
        reset();
    };

    const reset = () => {
        setName('');
        setNumber('');
    };

    return (
        <form
        className={s.form}
        onSubmit={handleSubmit}
    >
        <label>
            <p className={s.text}>Name</p> 
            <input
                type="text"
                name="name"
                value={name}
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
                onChange={handleChange}
                autoComplete="off"
            />
        </label>
        <label>
            <p className={s.text}>Phone number</p> 
            <input
                type="tel"
                name="number"
                value={number}
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
                onChange={handleChange}
                autoComplete="off"
            />
        </label>
        <p className={s.text}>
            <button className={s.btn} type="submit">Add contact</button>
        </p>    
    </form>    
    )
}

ContactsForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

