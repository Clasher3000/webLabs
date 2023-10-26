const submitButton = document.getElementById("registration-submit");
const table = document.getElementById("registration-table");
const selectedRows = [];
const duplicateButton = document.getElementById("duplicate-selected");
const deleteButton = document.getElementById("delete-selected");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const lastNameInput = document.getElementById("family-name");
const firstNameInput = document.getElementById("name");
const middleNameInput = document.getElementById("middle-name");
const birthDayInput = document.getElementById("birth-day");
const phoneNumberInput = document.getElementById("phone-number");
const genderInputs = document.querySelectorAll("input[name='gender']");
const groupInput = document.getElementById("group");
const avatarInput = document.getElementById("avatar");
let isChecked = false;
let errorsCount = 0;

function createErrorMessage(inputId, errorMessageId, message) {
    const errorDiv = document.getElementById(errorMessageId);
    errorDiv.textContent = message;
    errorDiv.style.color = "red";
    errorsCount ++;
}

function addRow() {
    const email = emailInput.value;
    const password = passwordInput.value;
    const lastName = capitalizeFirstLetter(lastNameInput.value);
    const firstName = capitalizeFirstLetter(firstNameInput.value);
    const middleName = capitalizeFirstLetter(middleNameInput.value);
    const birthDay = birthDayInput.value;
    const phoneNumber = phoneNumberInput.value;
    let gender;

    for (const genderInput of genderInputs) {
        if (genderInput.checked) {
            gender = genderInput.value;
            break;
        }
    }
    const group = groupInput.value;


    // Створюємо новий рядок для таблиці
    const newRow = table.insertRow(-1);

    // Додаємо комірки в новий рядок
    newRow.insertCell(0).textContent = email;
    newRow.insertCell(1).textContent = password;
    newRow.insertCell(2).textContent = lastName;
    newRow.insertCell(3).textContent = firstName;
    newRow.insertCell(4).textContent = middleName;
    newRow.insertCell(5).textContent = birthDay;
    newRow.insertCell(6).textContent = phoneNumber;
    newRow.insertCell(7).textContent = gender;
    newRow.insertCell(8).textContent = group;

    const selectCheckbox = document.createElement('input');
    selectCheckbox.type = 'checkbox';
    selectCheckbox.addEventListener('change', function () {
        toggleRowSelection(newRow, selectCheckbox);
    });
    const selectCell = newRow.insertCell(9);
    selectCell.appendChild(selectCheckbox);


    // Скидаємо значення полів форми
    emailInput.value = "";
    passwordInput.value = "";
    lastNameInput.value = "";
    firstNameInput.value = "";
    middleNameInput.value = "";
    birthDayInput.value = "";
    phoneNumberInput.value = "";
    for (const genderInput of genderInputs) {
        genderInput.checked = false;
    }
    groupInput.value = "";
    avatarInput.value = "";
    isChecked = false;

}
function toggleRowSelection(row, checkbox) {
    if (checkbox.checked) {
        // Додавання рядка до списку обраних, якщо чекбокс вибраний
        selectedRows.push(row);
    } else {
        // Видалення рядка із списку обраних, якщо чекбокс скасовано
        const index = selectedRows.indexOf(row);
        if (index !== -1) {
            selectedRows.splice(index, 1);
        }
    }
}


deleteButton.addEventListener('click', function () {
    deleteSelectedRows();
});
document.body.appendChild(deleteButton);

// Функція для видалення обраних рядків

    function deleteSelectedRows() {
        for (const row of selectedRows) {
            if (row.parentNode) {
                // Видаляємо рядок, якщо він все ще існує в таблиці
                row.parentNode.removeChild(row);
            }
        }

        // Очищаємо список виділених рядків
        selectedRows.length = 0;
    }


function duplicateSelectedRows() {
    const rowsToDuplicate = [...selectedRows]; // Копіюємо масив виділених рядків

    for (const row of rowsToDuplicate) {
        const newRow = row.cloneNode(true);
        const checkboxes = newRow.querySelectorAll("input[type='checkbox']");

        for (const checkbox of checkboxes) {
            checkbox.checked = false;
        }

        if (row.nextSibling) {
            // Якщо наступний рядок існує, додайте новий рядок перед ним
            table.insertBefore(newRow, row.nextSibling);
        } else {
            // Якщо наступного рядка немає, додайте новий рядок в кінці таблиці
            table.appendChild(newRow);
        }

        selectedRows.push(newRow); // Додайте новий рядок до списку обраних
    }
}

function validation() {

    const emailValue = emailInput.value;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/;
    const passwordValue = passwordInput.value;
    const lastNameValue = lastNameInput.value;
    const firstNameValue = firstNameInput.value;
    const middleNameValue = middleNameInput.value;
    const namePattern = /^[A-ZА-ЯЁa-zа-яё'`іїєґщьюяҐЇІЄ]+[A-ZА-ЯЁa-zа-яё'`іїєґщьюяҐЇІЄ]+$/;
    if (!emailPattern.test(emailValue)) {
        createErrorMessage("email", "email-error", "Це не схоже на електронну пошту.");
        emailInput.classList.add("is-invalid");

    } else {
        const emailError = document.getElementById("email-error");
        if (emailError) {
            emailError.textContent = "";
        }
        emailInput.classList.remove("is-invalid");
    }

    if (passwordValue.length < 4) {
        createErrorMessage("password", "password-error", "Пароль повинен містити щонайменше 4 символи.");
        passwordInput.classList.add("is-invalid");
    } else {
        const passwordError = document.getElementById("password-error");
        if (passwordError) {
            passwordError.textContent = "";
        }
        passwordInput.classList.remove("is-invalid");
    }
    if (!namePattern.test(lastNameValue)) {
        createErrorMessage("family-name", "family-name-error", "Некоректне прізвище.");
        lastNameInput.classList.add("is-invalid");
    } else {
        const lastNameError = document.getElementById("family-name-error");
        if (lastNameError) {
            lastNameError.textContent = "";
        }
        lastNameInput.classList.remove("is-invalid");
    }
    if (!namePattern.test(firstNameValue)) {
        createErrorMessage("name", "name-error", "Некоректне ім'я.");
        firstNameInput.classList.add("is-invalid");
    } else {
        const firstNameError = document.getElementById("name-error");
        if (firstNameError) {
            firstNameError.textContent = "";
        }
        firstNameInput.classList.remove("is-invalid");
    }
    if (!namePattern.test(middleNameValue)) {
        createErrorMessage("middle-name", "middle-name-error", "Некоректне ім'я по батькові.");
        middleNameInput.classList.add("is-invalid");
    } else {
        const middleNameError = document.getElementById("middle-name-error");
        if (middleNameError) {
            middleNameError.textContent = "";
        }
        middleNameInput.classList.remove("is-invalid");
    }
}
const currentDate = new Date().toISOString().slice(0, 10);

// Встановлюємо поточну дату як максимальну для вибору
document.getElementById("birth-day").setAttribute("max", currentDate)

submitButton.addEventListener("click", function(event) {
    validation();
    event.preventDefault();
    isChecked = true;
    if (errorsCount===0) {
      addRow();
    }
    errorsCount=0;
    const maleRadioButton = document.getElementById("male");
    maleRadioButton.checked = true;
});

// Додайте обробник події input поза умовним оператором
emailInput.addEventListener("input", function() {
    if (isChecked) {
        validation();
    }
});
passwordInput.addEventListener("input", function() {
    if (isChecked) {
        validation();
    }
});
firstNameInput.addEventListener("input", function() {
    if (isChecked) {
        validation();
    }
});
lastNameInput.addEventListener("input", function() {
    if (isChecked) {
        validation();
    }
});
middleNameInput.addEventListener("input", function() {
    if (isChecked) {
        validation();
    }
});

duplicateButton.addEventListener("click", function () {
   duplicateSelectedRows();
});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}