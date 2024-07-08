// находим кнопку с классом "create-json" и обрабатываем нажатие этой кнопки
document.querySelector(".create-json").addEventListener("click", (ev) => {
    // любая кнопка в форме имеет тип "submit" по умолчанию, т.е. служит для отправки формы на сервер
    // отправка формы влечет за собой перезагрузку страницы
    // нам это не нужно, поэтому отключаем стандартное поведение
    ev.preventDefault();

    // находим все textarea
    const inputs = document.querySelectorAll("textarea");

    // извлекаем значения, введенные пользователем
    // помещаем их в подмассивы в качестве элементов
    const arr = [];
    for (let i = 0; i < inputs.length; i++) {
        arr.push([inputs[i].value, inputs[i++].value]);
    }

    // проверяем в консоли
    console.log(arr);

    // преобразуем массив подмассивов в объект
    const data = Object.fromEntries(arr);

    // проверяем
    console.log(data);
    
    // создаем файл
    const file = new Blob([JSON.stringify(data)], {type: "application/json"});
    
    // проверяем
    console.log(file);
    
    // создаем элемент "a"
    const link = document.createElement("a");
    // привязываем атрибут "href" тега "a" к созданному файлу
    link.setAttribute("href", URL.createObjectURL(file));
    // атрибут "download" позволяет скачивать файлы, на которые указывает ссылка
    // значение этого атрибута - название скачиваемого файла
    link.setAttribute("download", "data.json");
    // текстовое содержимое ссылки
    link.textContent = "DOWNLOAD DATA";
    // помещаем элемент в контейнер с классом "main"
    document.querySelector(".main").append(link);
    // удаляем ссылку на файл
    URL.revokeObjectURL(file);

    // { once: true } автоматически удаляет обработчик после первого использования
    // повторный клик приводит к перезагрузке страницы
  },
  { once: true }
);

// находим кнопку (которая на самом деле ссылка) с классом "get-data" и обрабатываем ее нажатие
document.querySelector('.get-data').addEventListener('click', () => {
    // с помощью IIFE и async..await получаем данные и выводим их в консоль в виде таблицы
    (async () => {
        const response = await fetch("data.json");

        // разбираем (парсим) ответ
        const data = await response.json();

        console.table(data);
    })();
});
