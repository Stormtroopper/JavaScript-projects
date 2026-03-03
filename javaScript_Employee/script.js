let employees = JSON.parse(localStorage.getItem("employees")) || [];
let selectedId = null;

const saveEmployees = () =>
  localStorage.setItem("employees", JSON.stringify(employees));

const fetchEmployees = async () => {
  if (employees.length) return;

  const res = await fetch("./data.json");
  employees = await res.json();
  saveEmployees();
};

const init = async () => {
  await fetchEmployees();

  const listEl = document.querySelector(".employee_name_list");
  const infoEl = document.querySelector(".employee_single_info");
  const modal = document.querySelector(".add_employee");
  const form = document.querySelector(".add_employee_create");
  const createBtn = document.querySelector(".create_employee");
  const dobInput = document.querySelector(".addEmployee_create--dob");

  dobInput.max = `${new Date().getFullYear() - 18}-12-31`;

  selectedId = employees[0]?.id;

  const getSelected = () =>
    employees.find(emp => emp.id === selectedId);

  const render = () => {
    // Render List
    listEl.innerHTML = employees
      .map(emp => `
        <div class="employees_name_item ${emp.id === selectedId ? "selected" : ""}" 
             data-id="${emp.id}">
          ${emp.firstName} ${emp.lastName}
        </div>
      `)
      .join("");

    // Render Selected
    const emp = getSelected();
    if (!emp) return;

    infoEl.innerHTML = `
      <img src="${emp.imageUrl}" />
      <h3>${emp.firstName} ${emp.lastName} (${emp.age})</h3>
      <p>${emp.address}</p>
      <p>${emp.email}</p>
      <p>Mobile - ${emp.contactNumber}</p>
      <p>DOB - ${emp.dob}</p>
    `;
  };

  // Select employee
  listEl.addEventListener("click", e => {
    const item = e.target.closest("[data-id]");
    if (!item) return;

    selectedId = +item.dataset.id;
    render();
  });

  // Open modal
  createBtn.onclick = () => (modal.style.display = "flex");

  // Close modal
  modal.onclick = e => {
    if (e.target === modal) modal.style.display = "none";
  };

  // Add employee
  form.onsubmit = e => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form));
    const year = new Date().getFullYear();

    const newEmp = {
      ...data,
      id: Date.now(),
      age: year - parseInt(data.dob.slice(0, 4)),
      imageUrl:
        data.imageUrl ||
        "https://cdn-icons-png.flaticon.com/512/0/93.png"
    };

    employees.push(newEmp);
    saveEmployees();
    selectedId = newEmp.id;

    form.reset();
    modal.style.display = "none";
    render();
  };

  render();
};

init();
