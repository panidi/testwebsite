// функция получения данных
const getData = async url => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

// получаем данные
getData("https://panidi.github.io/testwebsite/data.json").then(data => {
        // проверяем
        console.table(data);
        
        // передаем данные функции создания теста
        createDescription(data);
    })

// функция создания описания
const createDescription = data => {
    // data - это объект из объектов
    // для каждого объекта
    for (const item in data) {
        // проверяем
        console.log(data[item]);

        // деструктурируем объект,
        // получаем значения вопроса, вариантов ответа, правильного ответа и объяснения
        const descriptionText = data[item];

        // шаблон вопроса
        const questionTemplate = `
            <div>
                <h1>Описание:</h1>
                <p class="descr">$descriptionText}</p>
            </div>
        `;
        
        // помещаем шаблон в конец документа
        document.body.insertAdjacentHTML("beforeend", questionTemplate);
    }};
