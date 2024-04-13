var click = 0;

function logic() {
    var lyricsBox = document.getElementsByClassName("none");
    lyricsBox[0].style.display = 'block';
    document.body.classList.remove("hidden_scroll_y");

    if (click > 0) {
        var myobj = document.getElementById("bodyt");
        myobj.remove();
        var newTable = document.createElement('tbody');
        head2.after(newTable);
        newTable.id = 'bodyt';
    }
	var oldman = document.getElementById("oldman").value;
    var people = document.getElementById("people").value;
    var children = document.getElementById("children").value;
    var percent = document.getElementById("percent").value;
    var sumObez = document.getElementById("sumObez").value;
    console.log(typeof sumObez);
    var prihod = document.getElementById("prihod").value;
    var start = document.getElementById("start").value;
    var duration = document.getElementById("duration").value;
    var mes = duration;
	if (prihod<=0 || people<=0 || percent<=0 || sumObez<=0 || duration<=0) {
		lyricsBox[0].style.display = 'none';
		alert ("Необходимо заполнить обязательные поля: Сумма дохода семьи, Трудоспособные члены семьи, Процент по кредиту, Другие затраты, Срок кредита по");

	}else{
    var dates = Date.parse(start);
	var dateNow = new Date() - 86400000;
	if (dates<dateNow){
		lyricsBox[0].style.display = 'none';
		alert ("Указана недопустимая дата: дата не может быть раньше настоящего дня");
	}else{
    var day = new Date(dates);
    var d = day.getDate();
	duration *= 2628000000;
	duration = new Date(duration+dates);
    var dates2 = Date.parse(duration+dates);
    var period = dates2 - dates;
    period /= 86400000;

    var adults = people;
    var pmin = adults * 16844 + children * 14989 + oldman * 13290;
    console.log(pmin);
    console.log(typeof pmin);
    console.log(typeof sumObez);
    var err = pmin + (parseInt(sumObez, 10));
    console.log(err);
	var everyMonthPay = prihod - sumObez - pmin;
	console.log(everyMonthPay);
	if (everyMonthPay <= 0){

    		lyricsBox[0].style.display = 'none';
		alert ("Сумма дохода семьи меньше суммы затрат (включая прожиточный минимум). Сумма затрат: "+err+" рублей, пожалуйста проверьте введённые данные");
	}else{
    document.getElementById("sk").innerHTML = mes + " мес.";
    var sumPay = mes;
    document.getElementById("kp").innerHTML = sumPay;
    var percentByMonth = percent / 12 / 100;
    document.getElementById("mp").innerHTML = (percentByMonth * 100).toFixed(4) + "%.";
    var everyMonthPay = prihod - sumObez - pmin;
    document.getElementById("efp").innerHTML = everyMonthPay + " рублей.";
    var fullCost = everyMonthPay * sumPay;
    document.getElementById("psk").innerHTML = fullCost + " рублей.";

    ka = (percentByMonth * Math.pow((1 + percentByMonth), sumPay)) / ((Math.pow((1 + percentByMonth), sumPay)) - 1);
    var tk = (everyMonthPay) / ka;
    var factGot = 0;
    var overprice = 0;
    var fullCostH = tk;
    var everyMPchange = 0;
    var factPayPercent = 0;
    var date = dates + 2592000000;
    for (let i = 0; i < sumPay; i++) {
        overprice = (fullCostH / 100) * (percentByMonth * 100);
        factPayPercent += overprice;
        everyMPchange = everyMonthPay - overprice;
        factGot += everyMPchange;
        fullCostH -= everyMPchange;
        var date2 = new Date(date);
        var month = date2.getMonth();
        var year = date2.getFullYear();
        /*switch (month) {
            case 1:
                month = "Январь";
                break;
            case 2:
                month = "Февраль";
                break;
            case 3:
                month = "Март";
                break;
            case 4:
                month = "Апрель";
                break;
            case 5:
                month = "Май";
                break;
            case 6:
                month = "Июнь";
                break;
            case 7:
                month = "Июль";
                break;
            case 8:
                month = "Август";
                break;
            case 9:
                month = "Сентябрь";
                break;
            case 10:
                month = "Октябрь";
                break;
            case 11:
                month = "Ноябрь";
                break;
            case 12:
                month = "Декабрь";
                break;
        }*/
        var str = document.createElement('tr');
        bodyt.append(str);
        str.id = "month" + (i + 1);
        for (let j = 0; j < 6; j++) {
            var stolb = document.createElement('td');
            var stold1 = document.getElementById("month" + (i + 1));
            stold1.append(stolb);
            stolb.id = "data" + i + j;
        }
        for (let m = 0; m < 6; m++) {
            if (m == 0) {
                var pom = document.getElementById("data" + i + m);
                pom.innerHTML = i + 1;
            } else if (m == 1) {
                var pom = document.getElementById("data" + i + m);
                pom.innerHTML = new Date(year, month, d).toLocaleDateString();
            } else if (m == 2) {
                var pom = document.getElementById("data" + i + m);
                pom.innerHTML = everyMonthPay.toFixed(2);
            } else if (m == 3) {
                var pom = document.getElementById("data" + i + m);
                pom.innerHTML = overprice.toFixed(2);
            } else if (m == 4) {
                var pom = document.getElementById("data" + i + m);
                pom.innerHTML = everyMPchange.toFixed(2);
            } else {
                var pom = document.getElementById("data" + i + m);
                if (fullCostH > 0) {
                    pom.innerHTML = fullCostH.toFixed(2);
                } else { pom.innerHTML = "0"; }
            }
        }

        date += 2592000000;
    }
    var truePercent = factPayPercent / (tk / 100);
    var percGd = percent;
    document.getElementById('td2').innerHTML = fullCost.toFixed(2);
    document.getElementById('td3').innerHTML = factPayPercent.toFixed(2);
    document.getElementById('td4').innerHTML = factGot.toFixed(2);
    document.getElementById("sp").innerHTML = factPayPercent.toFixed(2) + " рублей";
    document.getElementById("fs").innerHTML = factGot.toFixed(2) + " рублей";
    document.getElementById("pskg").innerHTML = truePercent.toFixed(2) + " %";
    document.getElementById("percGd").innerHTML = percGd + " %";



    var scroll = document.getElementById('div1');
    scroll.scrollIntoView();

    click++;}}}
}
