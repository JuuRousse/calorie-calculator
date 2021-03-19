const app = document.querySelector('#app').innerHTML = `
    <div class="calculator">
        <div class="container">
            <h2 class="general-title">Calorie calculator</h2>
            <div class="calculating-field">
                <div class="subtitle">Your gender</div>
                <div class="selection-block gender-selection" id="gender">
                    <div id="female" class="choose-item choose-item-active">Female</div>
                    <div id="male" class="choose-item">Male</div>
                </div>

                <div class="subtitle">Your parameters</div>
                <div class="selection-block parameters-selection">
                    <div class="inner-input">
                        <label for="height">Your height:</label>
                        <input type="number" id="height" placeholder="...sm" class="choose-item">
                    </div>
                    <div class="inner-input">
                        <label for="weight">Your weight:</label>
                        <input type="number" id="weight" placeholder="...kg" class="choose-item">
                    </div>
                    <div class="inner-input">
                        <label for="age">Your age:</label>
                        <input type="number" id="age" placeholder="...years" class="choose-item">
                    </div>
                </div>

                <div class="subtitle">
                    Your activity
                </div>
                <div class="selection-block activity-selection">
                    <div class="activity-selection-inner">
                        <div data-ratio="1.2" id="low" class="choose-item" title="little or not exersice/desk job">
                            Sedentary
                        </div>
                        <div data-ratio="1.375" id="small" class="choose-item choose-item-active"
                            title="light exersice/sports 1-3days/week">
                            Lightly active
                        </div>
                    </div>
                    <div class="activity-selection-inner">
                        <div data-ratio="1.55" id="medium" class="choose-item"
                            title="Moderate exersice/sports 3-5days/week">
                            Moderately active</div>
                        <div data-ratio="1.725" id="high" class="choose-item"
                            title="Heavy exersice/sports 5-7days/week">
                            Very active</div>
                    </div>
                </div>

                <div class="line-divider"></div>

                <div class="сalories-total-block">
                    <div class="subtitle">
                        Your daily calorie needs:
                    </div>
                    <div class="result">
                        <span>2700</span> cal
                    </div>
                </div>
            </div>
        </div>
    </div>
`;

const result = document.querySelector('.result span');

let sex, height, weight, age, ratio;


if (localStorage.getItem('sex')) {
    sex = localStorage.getItem('sex');
} else {
    sex = "female";
    localStorage.setItem('sex', 'female');
}

if (localStorage.getItem('ratio')) {
    sex = localStorage.getItem('ratio');
} else {
    ratio = 1.375;
    localStorage.setItem('ratio', 1.375);
};

const initLocalSettings = (selector, activeClass) => {
    const elements = document.querySelectorAll(selector);

    elements.forEach(item => {
        item.classList.remove(activeClass);

        if (item.getAttribute('id') === localStorage.getItem('sex')) {
            item.classList.add(activeClass);
        }

        if (item.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
            item.classList.add(activeClass);
        }
    })
};

initLocalSettings('#gender div', 'choose-item-active');
initLocalSettings('.activity-selection div', 'choose-item-active');

const calcTotal = () => {
    if (!sex || !height || !weight || !age || !ratio) {
        result.textContent = 0;
        return;
    }
    if (sex === 'female') {
        result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    } else {
        result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }
}

calcTotal();

const getStaticInformation = (selector, activeClass) => {
    const elements = document.querySelectorAll(selector);

    elements.forEach(item => {
        item.addEventListener('click', (event) => {
            if (event.target.getAttribute('data-ratio')) {
                ratio = +event.target.getAttribute('data-ratio');
                localStorage.setItem('ratio', +event.target.getAttribute('data-ratio'));
            } else {
                sex = event.target.getAttribute('id');
                localStorage.setItem('sex', event.target.getAttribute('id'));
            }

            elements.forEach(item => {
                item.classList.remove(activeClass);
            });

            event.target.classList.add(activeClass);

            calcTotal();
        });
    });
}

getStaticInformation('#gender div', 'choose-item-active');
getStaticInformation('.activity-selection div', 'choose-item-active');

const getDynamicInformation = (selector) => {
    const input = document.querySelector(selector);

    input.addEventListener('input', () => {

        switch (input.getAttribute('id')) {
            case "height":
                height = +input.value;
                break;
            case "weight":
                weight = +input.value;
                break;
            case "age":
                age = +input.value;
                break;
        }

        calcTotal();
    });
}

getDynamicInformation('#height');
getDynamicInformation('#weight');
getDynamicInformation('#age');
