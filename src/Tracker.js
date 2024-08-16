import React, { useState , useEffect } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import logo from './accountingpic.png';

function Tracker() {

    const [total, setTotal] = useState(0);
    const [cards, setCards] = useState([]);

    const [showError, setShowError] = useState({                // showError being false means it's not going to show an error from initialized state
        activity: false,
        amount: false,
    });

    const [input, setInput] = useState({                // encompasses all 3 diff input changes into one object with key-value pairs
        activity: "",
        amount: "",
        statementType: "income",
    });

    function handleInputUpdates(e) {
        setInput({ ...input, [e.target.name]: e.target.value, });         // [e.target.name] turns the object key into the e.target.value(what the user is typing)
    }


    function handleAddItem() {
        const { activity, amount, statementType } = input
        
        if (!activity) {
            return setShowError({
                activity: true,
                amount: false,
            });
        } else if (!amount) {
            return setShowError({
                activity: false,
                amount: true,
            });
        } else {
            setShowError({
                activity: false,
                amount: false,
            });
            setCards([...cards, {
                id: uuidv4(),
                name: activity,
                amount: parseFloat(amount).toFixed(2),
                type: statementType,
                date: new Date().toDateString(),
            },]);
            setInput({
                activity: "",
                amount: "",
                statementType: "income",
            })
        }
    }

       useEffect(() => {
        const totalSum  = cards.reduce((sum, {type, amount}) => {
            if (type === 'expense'){
                return sum - parseFloat(amount);
            } else 
                return sum + parseFloat(amount);
        }, 0)
        setTotal(totalSum);
       }, [cards]);

       function renderTotal(){
        if(total > 0) {
            return (<h1 className="total success">+${Math.abs(total)}</h1>);
       } else if (total < 0) {
            return (<h1 className="total danger">-${Math.abs(total)}</h1>);
       } else {
            return (<h1 className="total">${Math.abs(total)}</h1>);
       }
}

    return (
        <>
            <div className='header'>
                <h1 className='title-h1'>Expense Oversight</h1>
                <h6 className='sub-title'>stay on top of your finances</h6>
            </div>
            <div className="logopic">
          <img src={logo} alt="logo" className='logopic' height="450px" width="450px"/>
          </div>
            <div className='tracker-container'>
                <hr/>
                <div className="total">
                {renderTotal()}
                </div>
                <div className="inputs-add-button">
                    <input className='input-value-text' placeholder="Transaction Name.." onChange={handleInputUpdates} value={input.activity} name="activity" style={showError.activity ? { backgroundColor: "rgb(223, 106, 104)" } : null} />           {/*adding the name value allows the event.target to grab the key name*/}
                    <input className='amount-value-text' type="number" placeholder="Amount.." onChange={handleInputUpdates} value={input.amount} name="amount" style={showError.amount ? { backgroundColor: "rgb(223, 106, 104)" } : null} />
                    <select className='selector' onChange={handleInputUpdates} value={input.statementType} name="statementType">
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                    <button className='add-button' onClick={handleAddItem}>+</button>
                </div>
                <div className='list-of-cards'>
                   {cards.map(({name, amount, type, date, id}) => (
                      <div className="card" key={id}>
                      <div className="card-info">
                          <h4>{name}</h4>
                          <p>{date}</p>
                      </div>
                      <p className={`amount-text ${type === 'income' ? 'success' : 'danger'}`}>{type === 'income' ? '+' : '-'}${amount}</p>
                  </div>
                   ))}
                </div>
            </div>
            <div className="footer">
                <p>Designed & Coded by Anh Huynh</p>
            </div>
        </>
    );
}

export default Tracker
