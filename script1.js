var foodArray = [];
var foodObject = {
    dish: "",
    step: "",
    url: "",
    ingredients: [],
};
var ingredientsObject = {
    name: "",
    quantity: "",
    unit: ""
};
setLocalStorage();

// store the data in local storage
function setLocalStorage(value) {
    if (!value) {
        var arr = JSON.parse(localStorage.getItem("user"));
        if (arr && arr.length) {
            foodArray = arr;
            insertRecord();
        } else {
            if (foodArray && foodArray.length) {
                localStorage.setItem("user", JSON.stringify(foodArray));
            }
        }
    } else {
        if (foodArray && foodArray.length) {
            localStorage.clear();
            localStorage.setItem("user", JSON.stringify(foodArray));
            insertRecord();
            resetForm();
        }
    }
}
//hide and show the html elements according to the requirement
function displayForm() {
    $("#form").show();
    $("#tbl").hide();
    $("#Search").hide();
    $("#btn2").show();
    $("#ingredientData").hide();
    $("#Add").hide();

}

function onIngredientSubmit() {
    ingredientsObject.name = $("#name").val();
    ingredientsObject.quantity = $("#quantity").val();
    ingredientsObject.unit = $("#unit").val();


    if (ingredientsObject.quantity == "") {
        $('.feild3').hide();
        $('.feild4').text("Enter quantity");

    }
    else if (ingredientsObject.unit == "") {
        $('.feild4').hide();
        $('.feild5').text("Enter unit");
    }


    else {
        foodObject.ingredients.push(ingredientsObject);
        ingredientsObject = {
            name: "",
            quantity: "",
            unit: ""
        };
        insertIngredient(foodObject.ingredients);
        $("#ingredientData").show();
        resetIngredients();
    }
}

$("#btn").click(function () {
    foodObject.dish = $("#dish").val();
    foodObject.step = $("#step").val();
    foodObject.url = $("#url").val();

    ingredientsObject.name = $("#name").val();
    ingredientsObject.quantity = $("#quantity").val();
    ingredientsObject.unit = $("#unit").val();

    if (foodObject.dish == "") {
        // alert("Please Enter Dish name");
        $('.feild').text("Enter Dish name");
    }
    else if (foodObject.step == "") {
        $('.feild').hide();
        $('.feild1').text("Enter step of cook");

    }
    else if (foodObject.url == "") {
        $('.feild1').hide();
        $('.feild2').text(" Enter url");

    }
    else if ($("#name").val() == "") {
        $('.feild2').hide();
        $('.feild3').text(" Enter ingredients name");
    }
    else if ($("#quantity").val() == "") {
        $('.feild3').hide();
        $('.feild4').text("Enter quantity");

    }
    else if ($("#unit").val() == "") {
        $('.feild4').hide();
        $('.feild5').text("Enter unit");
    }

    else {

        $('.feild2').hide();
        foodArray.push(foodObject);
        foodObject = {
            dish: "",
            step: "",
            url: "",
            ingredients: [],
        }
        setLocalStorage("value");
        $("#tbl").show();
        $("#form").hide();
        $("#Add").show();
        $("#Search").show();

        foodObject.ingredients.push(ingredientsObject);
        ingredientsObject = {
            name: "",
            quantity: "",
            unit: ""
        };
        insertIngredient(foodObject.ingredients);
        $("#ingredientData").show();
        resetIngredients();
    }

});

//Edit the home page table 
function onEdit(dd) {
    foodObject = foodArray[dd];
    $("#dish").val(foodArray[dd].dish);
    $("#step").val(foodArray[dd].step);
    $("#url").val(foodArray[dd].url);
    $("#btn").val(dd);
    $("#form").show();
    $("#tbl").hide()
    $("#btn").hide();
    $("#update").show();
    $("#Search").hide();
    $("#Add").hide();
    $("#ingredientData").show();
    insertIngredient(foodObject.ingredients);
}
//Update the home page table
function onupdate() {
    dd = $("#btn").val();
    foodObject.name = $("#dish").val();
    foodObject.step = $("#step").val();
    foodObject.url = $("#url").val();
    foodArray[dd] = foodObject;
    foodObject = {
        dishName: "",
        cookingStep: "",
        url: "",
        ingredients: [],
    };
    setLocalStorage("update");
    $("#btn").show();
    $("#update").hide();
    $("#form").hide();
    $("#tbl").show();
    $("#Add").show();
    $("#Search").show();

}
function onEditRow(dd) {
    $("#addInd").hide();
    $("#updateInd").show();
    $("#updateInd").val(dd);

    ingredientsObject = foodObject.ingredients[dd];
    $("#name").val(ingredientsObject.name);
    $("#quantity").val(ingredientsObject.quantity);
    $("#unit").val(ingredientsObject.unit);
}
function onIngredientUpdate() {
    dd = $("#updateInd").val();
    ingredientsObject.name = $("#name").val();
    ingredientsObject.quantity = $("#quantity").val();
    ingredientsObject.unit = $("#unit").val();

    foodObject.ingredients[dd] = ingredientsObject;
    ingredientsObject = {
        name: "",
        quantity: "",
        unit: ""
    };
    insertIngredient(foodObject.ingredients);
    resetIngredients();
}
function insertRecord() {
    // validation();
    $("tbody").empty();
    let tr = "";
    if (foodArray && foodArray.length) {
        for (let i = 0; i < foodArray.length; i++) {
            tr += `<tr>
                <td>${foodArray[i].dish}</td>
                <td>${foodArray[i].step}</td>
                <td>${foodArray[i].url}</td>
                <td id="Ingredients${i}"></td>
                <td><button onclick="onEdit(${i})">Edit</button></td>
                <td><button  onclick ="onDelete(${i})">Delete</button</td>
              </tr>`;
        }
        $("tbody").html(tr);
        //Table for ingredients
        for (i = 0; i < foodArray.length; i++) {
            let ingredientList = "";
            let ingredientTable = document.getElementById(`Ingredients${i}`);
            ingredientTable.innerHTML = "";
            for (let j = 0; j < foodArray[i].ingredients.length; j++) {

                ingredientList += `${foodArray[i].ingredients[j].quantity}  ${foodArray[i].ingredients[j].unit} ${foodArray[i].ingredients[j].name}<br>`;

            }
            ingredientTable.innerHTML = ingredientList;
        }
    }


}

function insertIngredient(array) {
    let tr = " ";
    let ingredient = document.getElementById("ingredientData");
    ingredient.innerHTML = "";
    if (array && array.length) {
        tr = ` <div style="display: flex;justify-content: space-between;border:2px solid black;">
            <div style="border:2px solid white;">
            <label  style="font-weight: bold; background-color: green;" >Ingredient Name </label>
            </div>
            <div style="border:2px solid white;">
            <label style="font-weight: bold;background-color: green;">Ingredient Quantity</label>
            </div>
            <div style="border:2px solid white;">
            <label style="font-weight: bold;background-color: green;">Ingredient Unit</label>
            </div>
            <div style="border:2px solid white;">
            <label style="font-weight: bold;background-color: green;">Actions</label>
            </div>
            </div>`;

        for (i = 0; i < array.length; i++) {

            tr += `
      <div style="display: flex;justify-content: space-between; ">
       <div style ="margin-left:70px;">
        <p>${array[i].name}</p>
        </div>
        <div>
      
        <p>${array[i].quantity}</p>
        </div>
        <div>
        <p>${array[i].unit}</p>
        </div>
        <div><a onclick="onEditRow(${i})">Edit</a> <a onclick="onDeleteRow(${i})"> Delete</a>
        </div>
        </div>`;
        }
        ingredient.innerHTML = tr;
    }
}
//delete
function onDelete(dd) {
    foodArray.splice(dd, 1);
    $("tbody").empty();
    setLocalStorage("akanksha");
    localStorage.setItem("user", JSON.stringify(foodArray));
}
function resetForm() {
    $("#dish").val("");
    $("#step").val("");
    $("#url").val("");
}
function resetIngredients() {
    $("#name").val("");
    $("#quantity").val("");
    $("#unit").val("null");
}
function onDeleteRow(dd) {
    if (confirm("Are you sure!!!")) {
        foodObject.ingredients.splice(dd, 1);
        insertIngredient(foodObject.ingredients);
    }
}

function myFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("tbl");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[3];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }

    }
}
// function validation() {
//     let dishname = $("#dish").val();
//     (dishname.length == "")
//     $('.feild').text("Please enter dishname ");
// }


