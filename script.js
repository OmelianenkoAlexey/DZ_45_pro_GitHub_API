// ! ДЗ 46. GitHub API

// Вверху страницы находится инпут и кнопка.
// Пользователь может ввести туда username любого пользователя гитхаб.
// Когда пользователь ввел логин, он может нажать на кнопку "Найти".
// В этот момент приложение должно отправить запрос на API Github
// и получить информацию о пользователе


// Данные для пользователя берем из запроса https://api.github.com/users/{{login}} ,
// где логин - это логин выбраного пользователя.

// Н - р для пользователя vladimirkr url будет https://api.github.com/users/vladimirkr

// После получения данных нужно показать аватар пользователя (свойство avatar_url),
// количество репозиториев (свойство public_repos), количество фоловеров(свойство followers)
// и количество наблюдаемых(свойство following)

// Если такого юзернейма не существует гитхаб вернет ошибку(404).
// Попробуйте обработать ее в.catch

const API = "https://api.github.com/users"
const form = document.getElementById("form");
const button = document.getElementById("button");
const box = document.querySelector(".box");

async function controller(action) {
    try {
        const response = await fetch(action);
        // console.log(response);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(response.status)
        }
    } catch (err) {
        console.log(err);
    }
}

// ! eсли событие на form тогда нужно e.preventDefault() и НЕ нужно ставить type в button.
// form.addEventListener("submit", e => {
//     e.preventDefault();
// })

// ! eсли событие на button, используем click и добавляем type="button";
// ! тогда НЕ нужно e.defaultPrevented();
button.addEventListener("click", async () => {
    const InputValue = document.getElementById("input").value;
    const user = await controller(`${API}/${input.value}`)
    // console.log(user);
    render(user);
})

async function render(user) {
    const item = document.createElement("div");
    item.classList.add("item");

    const img = document.createElement("img");
    img.setAttribute("src", `${user.avatar_url}`);
    img.setAttribute("width", "300");

    const quantityRepos = document.createElement("p");
    quantityRepos.innerText = `Количество репозиториев: ${user.public_repos}.`;

    const quantityFolov = document.createElement("p");
    quantityFolov.innerText = `Количество фоловеров: ${user.followers}.`;

    const quantityObserved = document.createElement("p");
    quantityObserved.innerText = `Количество фоловеров: ${user.following}.`;

    item.append(img);
    item.append(quantityRepos);
    item.append(quantityFolov);
    item.append(quantityObserved);
    box.prepend(item);
};
