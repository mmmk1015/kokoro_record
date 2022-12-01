function generate_year_range(start, end) {
    let years = "";
    for (let year = start; year <= end; year++) {
        years += "<option value='" + year + "'>" + year + "</option>";
    }
    return years;
}

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");

let createYear = generate_year_range(1970, 2200);

document.getElementById("year").innerHTML = createYear;

let calendar = document.getElementById("calendar");
let lang = calendar.getAttribute('data-lang');

let months = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
let days = ["日", "月", "火", "水", "木", "金", "土"];

let dayHeader = "<tr>";
for (day in days) {
    dayHeader += "<th data-days='" + days[day] + "'>" + days[day] + "</th>";
}
dayHeader += "</tr>";

document.getElementById("thead-month").innerHTML = dayHeader;

monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);

function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {

    let firstDay = (new Date(year, month)).getDay();

    tbl = document.getElementById("calendar-body");

    tbl.innerHTML = "";

    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        let row = document.createElement("tr");

        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                cell = document.createElement("td");
                cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            } else if (date > daysInMonth(month, year)) {
                break;
            } else {
                cell = document.createElement("td");
                cell.setAttribute("data-date", date);
                cell.setAttribute("data-month", month + 1);
                cell.setAttribute("data-year", year);
                cell.setAttribute("data-month_name", months[month]);
                cell.className = "date-picker";
                cell.innerHTML = "<span>" + date + "</span>";

                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.className = "date-picker selected";
                    cell.innerHTML = "<a href='#' class='date'><span>" + date + "</span></a>";
                }
                row.appendChild(cell);
                date++;
            }
        }

        tbl.appendChild(row);
    }

}

function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}



/*modal close*/
$(function () {
    $('.date').click(function () {
        $('.overlay, .modal_area').fadeIn();
    });
    $('.send').click(function () {
        $('.overlay, .modal_area').fadeOut();
    });

    /* ラジオボタンで選択したものをコンソールに呼び出す */
    const feelingRadio = document.getElementsByName('feeling');
    const len = feelingRadio.length;
    feelingRadio[0].checked = true;

    function buttonClick() {
        const checkValue = [''];

        for (let i = 0; i < len; i++) {
            if (feelingRadio.item(i).checked) {
                checkValue = feelingRadio.item(i).value;
            }
        }
        console.log('選択されているのは ' + checkValue + ' です');
    }
    let saveButton = document.getElementById('send');
    saveButton.addEventListener('click', buttonClick);

    /* カレンダー表示 */
    $('.send').on('click', function() {
        if (feelingRadio.item(i).checked === 0) {
            $('.selected').html('<img src="img/good.png" alt="good" style="width:45px; height:45px;">');
        }
        else if (feelingRadio.item(i).checked === 1) {
            $('.selected').html('<img src="img/ok.png" alt="ok" style="width:45px; height:45px;">');
        }
        else if (feelingRadio.item(i).checked === 2) {
            $('.selected').html('<img src="img/soso.png" alt="soso" style="width:45px; height:45px;">');
        }
        else if (feelingRadio.item(i).checked === 3) {
            $('.selected').html('<img src="img/sad.png" alt="sad" style="width:45px; height:45px;">');
        }
        else if (feelingRadio.item(i).checked === 4) {
            $('.selected').html('<img src="img/mad.png" alt="mad" style="width:45px; height:45px;">');
        }
        else {
            $('.selected').text('💓');
        }
    });
});

