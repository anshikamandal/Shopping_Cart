import { useState } from 'react';
import './main.css'

function AddProduct({ Change,HandleCancel}) {
    let [name_data, updateName] = useState("");
    let [price_data, updatePrice] = useState(0);


    return (
        <div className='input_label'>
            <input id='name' maxLength={30} placeholder='Item Name' style={{ width: '230px' }}
                onChange={(e) => { updateName(e.target.value) }}></input>

            <input id='price' type='number' min={1} placeholder='Price' style={{ width: '50px' }}
                onChange={(e) => { updatePrice(e.target.value) }}></input>
            
            <button onClick={() => { Change(name_data, price_data); }}>Enter</button>
            
            <button onClick={()=>{HandleCancel()}}>Cancel</button>
        </div>
    );
}

export default AddProduct;