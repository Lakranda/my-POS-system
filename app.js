//order

const menuItems = [    
    { name: "Burger", code: "001", price: 1000, expirationDate: "2024-10-01", discount: 0 },
    { name: "Pizza", code: "002", price: 2000, expirationDate: "2024-09-28", discount: 10 },
];

let cart = [];

let orders = [];

let idCounter=1000;

//customer


let customers=[];
let codeCounter=1000;


//item

    let items = [];
    let itemCode=1000;


loadDashboardArea()
loadOrderarea()

//dadhboard area

function loadDashboardArea(){
    let dashBoard=`
    
    <div>
        <input type="button" value="Order" onclick="loadOrderarea()">
        <input type="button" value="Customer" onclick="loadCustomerarea()">
        <input type="button" value="Item" onclick="loadItemArea()">
    </div>

    `;

    document.getElementById('dashboard').innerHTML=dashBoard;

}



//start orderArea

//load order Area

function loadOrderarea(){

    let orderBody=`

    <div>
    <h1>Order Area</h1>
    <div class="menu">
        <input type="text" placeholder="Customer ID" id="custId">
        <input type="text" id="search" placeholder="Item">
        <button onclick="searchMenu()">Search</button>
        <ul id="menuItems"></ul>
    </div>
    <div class="cart">
        <h2>Cart</h2>
        <ul id="cartItems"></ul>
        <div>
            <label for="discount">Discount (%) :</label>
            <input type="number" id="discount" value="0">
            <input type="button" onclick="calculateTotal()" value="Calculate Total">
            <p id="totalAmount"></p>
        </div>
    </div>
</div>
<div>
    <div class="orders">
        <h2>Previous Orders</h2>
        <input type="text" id="search-orders" placeholder="Search by Order ID or Phone Number">
        <table id="orders-list"></table>
    </div>
    <div>
        <table id="orderItems"></table>
    </div>        
</div>

    `;

document.getElementById('viewArea').innerHTML=orderBody;

displayOrders()

}


    //---------------------------------------




function searchMenu() {
    const query = document.getElementById('search').value.toLowerCase();
    const filteredItems = menuItems.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.code.includes(query)
    );
    
    const menuList = document.getElementById('menuItems');
    menuList.innerHTML = '';

    filteredItems.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} (Code: ${item.code}) - Rs ${item.price.toFixed(2)} 
        <button onclick="addToCart('${item.code}')">Add to Cart</button>`;
        menuList.appendChild(li);
    });
}

function addToCart(itemCode) {
    const item = menuItems.find(i => i.code === itemCode);
    if (item) {
        const existingItem = cart.find(i => i.code === itemCode);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...item, quantity: 1 });
        }
        updateCartDisplay();
    }
}

function updateCartDisplay() {
    const cartList = document.getElementById('cartItems');
    cartList.innerHTML = '';

    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} - ${item.quantity} x Rs${item.price.toFixed(2)}`;
        cartList.appendChild(li);
    });
}

function calculateTotal(){

    let custId=document.getElementById('custId').value;
    let orderDate;
    let orderTime;
    //
    const discountPercentage = parseFloat(document.getElementById('discount').value) || 0;
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const finalAmount = total - (total * (discountPercentage / 100));
    const itemNames=[];

    cart.forEach(item => {
        itemNames.push(item.name)
    });

    document.getElementById('totalAmount').innerText = `Final Amount: Rs${finalAmount.toFixed(2)}`;

    const now = new Date();

    let order={
        orderId : idCounter+=1,
        custId,
        orderDate : now.toLocaleDateString('en-US'),
        orderTime:now.toLocaleTimeString('en-US'),
        itemNames,
        finalAmount,
        discount : (total * (discountPercentage / 100))

    }

    orders.push(order);

    displayOrders();


}

function displayOrders(){
    const table=document.getElementById('orders-list');

    let tblBody=`<tr>
                    <th>Customer Id</th>
                    <th>Order Id</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Discount</th>
                    <th>Total</th>
                    <th>Details</th>
                </tr>`;


    orders.forEach(order=>
        tblBody+=`<tr>
                    <td>${order.custId}</td>
                    <td>${order.orderId}</td>
                    <td>${order.orderDate}</td>
                    <td>${order.orderTime}</td>
                    <td>${order.discount}</td>
                    <td>${order.finalAmount}</td>
                    <td class="actions">
                        <button onclick="moreDetails((${order.itemNames}),${order.orderId})">more...</button>
                    </td>
                 </tr>`
                  
    )

    table.innerHTML=tblBody;

}

function moreDetails(items,orderId){
    console.log(items,orderId);
    

    document.getElementById('orderItems').innerHTML="ok"


    const table2=document.getElementById('orderItems');

    let tblBody=`<tr>
                    <th>Order Id</th>
                    <th>Item Name</th>
                </tr>`;


    items.forEach(itemName=>
        tblBody+=`<tr>
                    <td>${orderId}</td>
                    <td>${itemName}</td>
                 </tr>`
                  
    )

    table2.innerHTML=tblBody;

}



//end orderArea


// start customer area

// load customer area

function loadCustomerarea(){

    let customerarea=`
    
                     <div>
        <h1>Customer Area</h1>
    </div>
    
    <div>
        <h2>Add Customer</h2>
        <input type="text" placeholder="Customer Name" id="name">
        <input type="text" placeholder="Customer Phone" id="number">
        <input type="button" value="Add Customer" onclick="btnAddCustomerOnAction()">
    </div>
    
    <div>
        <h2>Customer List</h2>
        <table id="tblCustomers">  </table>
    </div>       
    
    `;


    document.getElementById('viewArea').innerHTML=customerarea;

    displayCustomers();

}


    //--------------------------------------------




function btnAddCustomerOnAction(){
    const name=document.getElementById('name').value;
    const number=document.getElementById('number').value;
    
    const customer={
        code:codeCounter+=1,
        name,
        number
    }

    
    customers.push(customer);

    displayCustomers();

}

function displayCustomers(){
    let table=document.getElementById('tblCustomers');

    let tblBody = `<tr>
                    <th>Customer Name</th>
                    <th>Customer Phone</th>
                    <th>ActionS</th>
                </tr>`;

    customers.forEach(customer=>
        tblBody+=`<tr>
                    <td>${customer.name}</td>
                    <td>${customer.number}</td>
                    <td class="actions">
                        <button onclick="deleteItem(${customer.code})">Delete</button>
                        <button onclick="updateItem(${customer.code})">Update</button>
                    </td>
                </tr>`
    )

    table.innerHTML=tblBody;

}

function deleteItem(code) {    
    items = items.filter(item => item.code !== code);
    displayCustomers();
}


//end customerArea


// start Item area

// load Item area


function loadItemArea(){

    let itemArea=`
    
    <div>
        <h1>Item Area</h1>
    </div>

    <div>
        <h2>Add New Item</h2>
            <input type="text" id="itemName" placeholder="Item Name" required>
            <input type="number" id="itemPrice" placeholder="Price" required>
            <input type="number" id="itemQuantity" placeholder="Quantity" required>
            <input type="date" id="itemExpiry" required>
            <input type="button" value="Add Item" onclick="btnAddItemOnAction()">
    </div>

    <div>
        <h2>Food Items</h2>
        <table id="itemTable" > </table>
    </div>
    
    `;

    document.getElementById('viewArea').innerHTML=itemArea;
    displayItems();
}

    //----------------------------------



    
    
    function btnAddItemOnAction(){

        
        let name = document.getElementById('itemName').value;
        let price = parseFloat(document.getElementById('itemPrice').value);
        let quantity = parseInt(document.getElementById('itemQuantity').value);
        const expiry = document.getElementById('itemExpiry').value;
    
        const item = {
            code: (itemCode+=1),   //("B"+(itemCode+=1)),
            name,
            price,
            quantity,
            expiry
        };

        notifyExpiredItems();

        if((new Date().toISOString().split('T')[0])<expiry){
            items.push(item);
        }else{
            alert(`Item "${item.name}" has expired!`);
        }

        displayItems();

    
    }
    
    function displayItems(){
        const table=document.getElementById('itemTable');
    
        let tblBody=`<tr>
                        <th>Item Code</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Expiry Date</th>
                        <th>Actions</th>
                    </tr>`;
    
    
        items.forEach(item=>
            tblBody+=`<tr>
                        <td>B${item.code}</td>
                        <td>${item.name}</td>
                        <td>${item.price.toFixed(2)}</td>
                        <td>${item.quantity}</td>
                        <td>${item.expiry}</td>
                        <td class="actions">
                            <button onclick="deleteItem(${item.code})">Delete</button>
                            <button onclick="updateItem(${item.code})">Update</button>
                        </td>
                     </tr>`
                      
        )
    
        notifyExpiredItems();
        table.innerHTML=tblBody;
    
    }
    
    
    function deleteItem(code) {
        items = items.filter(item => item.code !== code);
        displayItems();
    }
    
    function updateItem(code){
        console.log(code);
        let item1 = items.find(item => item.code === code);
        console.log(item1);
    }
    
    function notifyExpiredItems() {
        const today = new Date().toISOString().split('T')[0];
        items.forEach(item => {
            if (item.expiry < today) {
                alert(`Item "${item.name}" has expired!`);
                deleteItem(item.code);
            }
        });
    }
    