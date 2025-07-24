import './main.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState } from 'react';
import AddProduct from './AddProduct';

function Main() {
  let [inputLabel, updateLabel] = useState(false);
  let [shoppingList, updateShoppingList] = useState([]);
  let [price, updatePrice] = useState(0);
  let [completedPurchase, updatePurchasedList] = useState([]);

  let dragStartPos = useRef({
    container: "",
    fun: "",
    index: 0
  });

  const dragStart = (e, container, fun, index) => {
    e.target.style.opacity = 0.5;
    dragStartPos.current.container = container;
    dragStartPos.current.fun = fun;
    dragStartPos.current.index = index;
  };


  function HandleDrop(e, container, fun2) {

    const draggedItem = dragStartPos.current.container[dragStartPos.current.index];

    let arr = dragStartPos.current.container.filter((item) => draggedItem != item);

    dragStartPos.current.fun(arr);

    fun2([{description:draggedItem.description , price: draggedItem.price}, ...container]);
    
    updatePrice(()=>{
      return dragStartPos.current.container==shoppingList?Number(price)-Number(draggedItem.price):Number(price)+Number(draggedItem.price);
    });
  }

  const dragEnd = (e, container, fun2) => {
    e.target.style.opacity = 1;
  }

  function Change(name, pricee) {
    updateLabel(false);
    updateShoppingList([{ description: name, status: false, price: pricee }, ...shoppingList]);
    updatePrice(() => (Number(price) + Number(pricee)));
  }
  function HandleCancel() {
    updateLabel(false);
  }

  return (
    <>
      <div style={{ backgroundColor: '#FDD9A0' }}>
        
        <p className='website_description_1'>Welcome to a shopping experience designed for simplicity and elegance.
          Add your products into </p>
        <p className='website_description_2'>your cart, track your total live, and enjoy the smooth flow of a pastel-perfect interface.</p>

        <div className="product_and_cost_container">

          <div  onDragOver={(e) => e.preventDefault()} onDrop={(e) => HandleDrop(e, shoppingList, updateShoppingList)} className="product_container">
            <p className='label'>Shopping List</p>
            <hr></hr>

            <div className='add_label' onClick={() => updateLabel(true)}>
              <p style={{ margin: '0' }}>Add Product</p>
              <FontAwesomeIcon icon={faPlus} />
            </div>
            {
              inputLabel && <AddProduct Change={Change} HandleCancel={HandleCancel} />
            }
            {
              shoppingList.map((ob) => {
                return (
                  <div draggable style={{ cursor: 'crosshair' }} onDragEnd={(e) => dragEnd(e)} onDragStart={(e) => dragStart(e, shoppingList, updateShoppingList, shoppingList.indexOf(ob))} className='add_label'
                    key={`${shoppingList.indexOf(ob)}`}>
                    <p>{shoppingList.indexOf(ob) + 1}.       {ob.description}</p>
                    <p>Rs. {ob.price}</p>
                  </div>
                );
              })
            }
          </div>

          <div className="cost_container">
            <p className='label'>Total Expenditure</p>
            <hr></hr>
            <p className='price_display'>Rs. {price}</p>
          </div>
        </div>

        <div className='purchased_products_container'>

          <div className="purchased_products_child"  onDragOver={(e) => e.preventDefault()} onDrop={(e) => HandleDrop(e, completedPurchase, updatePurchasedList)} >
            <p className='label'>Completed Purchase</p>
            <hr></hr>
          {
              completedPurchase.map((ob) => {
                return (
                  <div draggable style={{ cursor: 'crosshair' }} onDragEnd={(e) => dragEnd(e)} onDragStart={(e) => dragStart(e, completedPurchase, updatePurchasedList, completedPurchase.indexOf(ob))} className='add_label'
                    key={`${completedPurchase.indexOf(ob)}`}>
                    <p>{completedPurchase.indexOf(ob) + 1}.       {ob.description}</p>
                    <p>Rs. {ob.price}</p>
                  </div>
                );
              })
            }
           </div>
        </div>

      </div>
    </>
  );
}

export default Main;