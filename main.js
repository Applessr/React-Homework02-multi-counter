function App() {
    const [counters, setCounters] = React.useState([
        {id: 1, number: 0},
    ]);
 
    const addCounter = () => {
        const newCounter = {id: Math.round(Math.random()*1000) , number: 0};  
        const newCounters = [...counters, newCounter];  
        setCounters(newCounters);
    }

    const plusAll = () => {
        const newCounters = counters.map(counter => ({
            ...counter, 
            number: counter.number + 1
        }));
        console.log(newCounters);
        setCounters(newCounters);
    };

    const updateCounter = (id, n) => {
        let idx = counters.findIndex(el => el.id === id);
        const newCounters = [...counters];
        if (newCounters[idx].number + n < 0) return;
        newCounters[idx].number += n;
        console.log(newCounters)
        setCounters(newCounters);
    };

    
    const delCounter = (id) => {
        const newCounters = counters.filter(counter => counter.id !== id);
        setCounters(newCounters);
    };

    return (
        <div className='app'>
            <h1 className="show-sum">Sum = {counters.reduce((acc, el) => acc + el.number, 0)} </h1> 
            <div className="flexBtn">
                <button className="btn-add" onClick={addCounter}>Add Counter</button>
                <button className="btn-plusOne" onClick={plusAll}> + 1 </button>
            </div>
            <hr />
            {counters.map(el => (
                <Counter key={el.id} item={el} updateCounter={updateCounter} delCounter={delCounter} />
            ))}
        </div>
    );
}

function Counter(props) {
    // console.log(props)
    const { item, updateCounter, delCounter } = props;
    return (
        <div className="counter">
            <button className="btn btn-dec" onClick={() => updateCounter(item.id, -1)}>-</button>
            <h3 className="number">{item.number}</h3>
            <button className="btn btn-inc" onClick={() => updateCounter(item.id, 1)}>+</button>
            <button className="btn btn-clr" onClick={() => updateCounter(item.id, -item.number)}>C</button>
            <button className="btn btn-delete" onClick={() => delCounter(item.id)}>X</button>  
        </div>
    );
}

ReactDOM.createRoot(document.querySelector('#root')).render(<App />);