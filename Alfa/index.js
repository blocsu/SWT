var age = {years: 13, months: 10, days: 15};
var answer ="Возраст:" + age["years"] + "лет, " + age.months + "месяцев.";
var animals = [];
animals.push("Кот");
animals.push("Пёс");
animals.push("Альпака");

function countSum(num1, num2) {
    num1 + num2;
}
var a = countSum(2, 3);

function fifthLetter(name) {
    if(name.length < 5) {
        return;
    }
    return "Пятая буква вашего имени: " + name[4] + ".";
}

function getGreeting(name, patronymic, surname) {
    if(name && patronymic && surname) {
        return "Здравствуйте, " + name + " " + patronymic + " " + surname + "!";
    }else if(name && patronymic) {
        return "Здравствуйте, " + name + " " + patronymic + "!";
    }else if(name) {
        return "Здравствуйте, " + name + "!";
    }else {
        return "Здравствуйте, незнакомец!";
    }
}
console.log(getGreeting("иван", "Иванович"));