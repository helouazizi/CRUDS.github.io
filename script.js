// lets get element fropm the pege

let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let descount = document.getElementById('descount');
let count = document.getElementById('count');
let total = document.getElementById('total');
let category = document.getElementById('category');
let create = document.getElementById('create');
let srch = document.getElementById('srch');
let srch_name = document.getElementById('srch-name');
let srch_category = document.getElementById('srch-gategory');
let product = document.getElementById('product');
let input = document.querySelector('.input');

let mood = 'first';
let state;








// lets craete the function that calculate the total


function getTotalPrice(){
    if(price != '0000'){
        let result = (+price.value +  +ads.value + +taxes.value) - +descount.value;
        total.innerHTML = result ;
        total.style.backgroundColor = 'rgba(29, 152, 253, 0.619)';
    }else{
        total.style.backgroundColor = 'rgba(255, 76, 76, 0.619)';
    }
    
};




// lets craete the function that create the product 

let product_data ; // this condition for chec if local storage is empty 
if(localStorage.product != null){
    product_data = JSON.parse(localStorage.product);
}else{
    product_data = [];
}



create.onclick = function(){
    let new_product = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        descount: descount.value,
        total: total.innerHTML,
        category: category.value.toLowerCase(),
        count: count.value,
    };
    if(title.value != ''
     && price.value != ''
     && category.value != ''
     && new_product.count < 100 ){
        if(mood === 'first'){
            if(new_product.count > 1){
                for(let i = 1; i<= new_product.count; i++){
                    product_data.push(new_product);
                }
            }else{
                product_data.push(new_product);
            }
            //alert('first mood');
        }else{
            count.style.display = 'block';
            create.innerHTML = 'create';
            product_data[state] = new_product;
        }
    }
    
   
    localStorage.setItem( 'product', JSON.stringify(product_data));
    cleardata(); // this for clear data its created below
    showdata(); 
    //console.log(product_data);
    
};

// lets create function to clear  input data after createing product

function cleardata(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    descount.value = '';
    count.value = '';
    category.value = '';
    total.innerHTML = '0000';
    
};


// lets create function to show data in table

function showdata(){
    let products = '';
    for(let i = 0; i < product_data.length; i++){
        products += `
            <tr>
                <td>${i+1
                }</td>
                <td>${product_data[i].title}</td>
                <td>${product_data[i].price}</td>
                <td>${product_data[i].taxes}</td>
                <td>${product_data[i].ads}</td>
                <td>${product_data[i].descount}</td>
                <td>${product_data[i].total}</td>
                <td>${product_data[i].category}</td>
                <td><button onclick = deletlocaldata(${i})>delet</button></td>
                <td><button onclick = updatedata(${i})>update</button></td>
            </tr>
        
        `;
        
    };

    document.getElementById('products').innerHTML = products;
    
    let btndelet = document.getElementById('deletalldata');
    if(product_data.length > 0){
        
        btndelet.innerHTML = `<button onclick = 'deletalldata()'>delet-all(${product_data.length})</button>`;
        
    }else{
        btndelet.innerHTML = '';
    }
            
}
//showdata();

// let crrate function taht delet local data 

function deletlocaldata(i){
    product_data.splice(i,1);
    localStorage.product = JSON.stringify(product_data);
    showdata();
};

// lets create function that update data

function updatedata(i){
    title.value = product_data[i].title;
    price.value = product_data[i].price;
    taxes.value = product_data[i].taxes;
    ads.value = product_data[i].ads;
    descount.value = product_data[i].descount;
    count.value = product_data[i].count;
    category.value = product_data[i].category;
    total.innerHTML = product_data[i].total;

    count.style.display = 'none';
    create.innerHTML = 'update';
    mood = 'second';
    state = i;
    scroll({
        top : 0,
        behavior : "smooth",
    });
    
};


// lets create function that delet all data from table

function deletalldata(){
    localStorage.clear();
    product_data.splice(0);
    showdata();
}

// lets create function for search

let searchmood = 'srch-name';

function search(id){
    let searchzone = document.getElementById('srcho');
    if( id == 'srch-name'){
        searchmood = 'srch-name';
    }else{
        searchmood = 'srch-category';
    }
    //searchzone.style.backgroundColor = 'black';
    //searchzone.innerHTML = 'suuuuuuu';
    searchzone.focus();
    searchzone.style.scale = '1.03';
    searchzone.style.backgroundColor = ' #08404f';
    console.log(searchmood);
    searchzone.value = '';
    showdata();
}

// lets create function that serch dtat

function searchdata(value){
    let products = '';
    if( searchmood == 'srch-name'){
        for( let i = 0; i < product_data.length; i++){
            if(product_data[i].title.includes(value.toLowerCase())){
                products += `
                    <tr>
                        <td>${i}</td>
                        <td>${product_data[i].title}</td>
                        <td>${product_data[i].price}</td>
                        <td>${product_data[i].taxes}</td>
                        <td>${product_data[i].ads}</td>
                        <td>${product_data[i].descount}</td>
                        <td>${product_data[i].total}</td>
                        <td>${product_data[i].category}</td>
                        <td><button onclick = deletlocaldata(${i})>delet</button></td>
                        <td><button onclick = updatedata(${i})>update</button></td>
                    </tr>

                `;
            }
        }
    }else{
        for( let i = 0; i < product_data.length; i++){
            if(product_data[i].category.includes(value.toLowerCase())){
                products += `
                    <tr>
                        <td>${i}</td>
                        <td>${product_data[i].title}</td>
                        <td>${product_data[i].price}</td>
                        <td>${product_data[i].taxes}</td>
                        <td>${product_data[i].ads}</td>
                        <td>${product_data[i].descount}</td>
                        <td>${product_data[i].total}</td>
                        <td>${product_data[i].category}</td>
                        <td><button onclick = deletlocaldata(${i})>delet</button></td>
                        <td><button onclick = updatedata(${i})>update</button></td>
                    </tr>

                `;
            }
        }
    }
    document.getElementById('products').innerHTML = products;
}

 