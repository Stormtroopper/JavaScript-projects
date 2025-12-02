let employees = [];   // GLOBAL so we can reuse it
let selectedEmployeeId = null;
let selectedEmployee = null;

function saveEmployees(list) {
    localStorage.setItem("employees", JSON.stringify(list));
}

function loadEmployees() {
    const data = localStorage.getItem("employees");
    return data ? JSON.parse(data) : null;
}

const basic_info = async () => {

    // Load saved data first
    const saved = loadEmployees();

    if (saved) {
        employees = saved;
    } else {
        const data = await fetch("./data.json");
        employees = await data.json();
        saveEmployees(employees);
    }

    // DOM elements
    const employeeList = document.querySelector(".employee_name_list");
    const employeeInfo = document.querySelector(".employee_single_info");
    const createEmployeeBtn = document.querySelector(".create_employee");
    const addEmployeeModal = document.querySelector(".add_employee");
    const addEmployeeForm = document.querySelector(".add_employee_create");
    const dobInput = document.querySelector(".addEmployee_create--dob");

    // DOB max = 18 yrs old
    dobInput.max = `${new Date().getFullYear() - 18}-12-31`;

    selectedEmployeeId = employees[0].id;
    selectedEmployee = employees[0];

    // ------------------------------------------------------
    // RENDER LIST
    // ------------------------------------------------------
    const renderEmployees = () => {
        employeeList.innerHTML = "";

        employees.forEach(emp => {
            const item = document.createElement("div");
            item.classList.add("employees_name_item");

            if (emp.id === selectedEmployeeId) {
                item.classList.add("selected");
                selectedEmployee = emp;
            }

            item.dataset.id = emp.id;
            item.innerHTML = `
                ${emp.firstName} ${emp.lastName}
                <i class="employeeDelete">❌</i>
            `;

            employeeList.appendChild(item);
        });
    };

    // ------------------------------------------------------
    // RENDER SINGLE EMPLOYEE
    // ------------------------------------------------------
    const renderSingleEmployee = () => {
        employeeInfo.innerHTML = `
            <img src="${selectedEmployee.imageUrl}"/>
            <span class="employees__single--heading">
                ${selectedEmployee.firstName} ${selectedEmployee.lastName} (${selectedEmployee.age})
            </span><br/>
            <span>${selectedEmployee.address}</span>
            <span>${selectedEmployee.email}</span><br/>
            <span>Mobile - ${selectedEmployee.contactNumber}</span>
            <span>DOB - ${selectedEmployee.dob}</span>
        `;
    };

    // ------------------------------------------------------
    // CLICK LIST TO SELECT EMPLOYEE
    // ------------------------------------------------------
    employeeList.addEventListener("click", e => {
        const div = e.target.closest("div");
        if (!div) return;

        const id = parseInt(div.dataset.id);
        selectedEmployeeId = id;
        selectedEmployee = employees.find(emp => emp.id === id);

        renderEmployees();
        renderSingleEmployee();
    });

    // ------------------------------------------------------
    // OPEN / CLOSE MODAL
    // ------------------------------------------------------
    createEmployeeBtn.addEventListener("click", () => {
        addEmployeeModal.style.display = "flex";
    });

    addEmployeeModal.addEventListener("click", (e) => {
        if (e.target.classList.contains("add_employee")) {
            addEmployeeModal.style.display = "none";
        }
    });

    // ------------------------------------------------------
    // ADD EMPLOYEE
    // ------------------------------------------------------
    addEmployeeForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = Object.fromEntries(new FormData(addEmployeeForm));

        const emp = {
            ...formData,
            id: employees.length + 1,
            age: new Date().getFullYear() - parseInt(formData.dob.slice(0, 4)),
            imageUrl: formData.imageUrl || "https://cdn-icons-png.flaticon.com/512/0/93.png"
        };

        employees.push(emp);
        saveEmployees(employees);

        selectedEmployeeId = emp.id;
        selectedEmployee = emp;

        renderEmployees();
        renderSingleEmployee();

        addEmployeeForm.reset();
        addEmployeeModal.style.display = "none";
    });

    // Initial render
    renderEmployees();
    renderSingleEmployee();
};

basic_info();
