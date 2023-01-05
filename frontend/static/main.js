var metro_select = document.getElementById('metro_station');
ymaps.ready(init);
function init () {
    var coords_arr = [55.776882, 37.581352]
    var myMap = new ymaps.Map("map", {
            center: [55.776882, 37.581352],
            zoom: 16
        }, {
            searchControlProvider: 'yandex#search'
        });
    function addMark(coords, iconContentVal, presetVal, menuContentVal, elemTag, percent){
        var myPlacemark = new ymaps.Placemark(coords, {
        iconContent: iconContentVal
    }, {
        preset: presetVal
    });
        myPlacemark.events.add('contextmenu', function (e) {
        if ($(elemTag).css('display') == 'block') {
            $(elemTag).remove();
        } else {
            var menuContent = menuContentVal
            $('body').append(menuContent);
            $(elemTag).css({
                left: e.get('pagePixels')[0],
                top: e.get('pagePixels')[1]
            });

            $(`${elemTag} input[type="submit"]`).click(function () {
                $(elemTag).remove();
            });
        }
    });
    myMap.geoObjects.add(myPlacemark);
    return percent;
    }
    
    var load = "load";
    var percent = "percent";
    function addMoveMark(coords, iconContentVal, presetVal, menuContentVal, elemTag){
        myPlacemark = new ymaps.Placemark([21.324580, 0.951634],{iconContent: iconContentVal}, {preset: presetVal, draggable: true});
        myMap.geoObjects.add(myPlacemark);
        
        myPlacemark.events.add("dragend", function (e) {
            let coords = this.geometry.getCoordinates();
            coords_arr = coords
            myPlacemark.geometry.setCoordinates(coords);
            }, myPlacemark);
    
        myMap.events.add('click', function (e) {        
             let coords = e.get('coords');
            coords_arr = coords
            myPlacemark.geometry.setCoordinates(coords);
            return coords;     
        }); 
        
        myPlacemark.events.add('contextmenu', function (e) {
                if ($(elemTag).css('display') == 'block') {
                    $(elemTag).remove();
                } else {
                    var menuContent = menuContentVal
                    $('body').append(menuContent);
                    $(elemTag).css({
                        left: e.get('pagePixels')[0],
                        top: e.get('pagePixels')[1]
                    });
                    $(`${elemTag} input[type="submit"]`).click(function () {
                        $(elemTag).remove();}
            )};
    });
    return percent;
    }

    btn.onclick = function () {
        let type = select.value
        let houses = 1
        let area = document.getElementById('square').value
        let floors = document.getElementById('floors').value
        let important = 1
        let time = document.getElementById('time').value
        if (type === 'ЖК') {
            houses = document.getElementById('houses').value
        }
        let metro = metro_select.value
        let url = `/api/traffic?cords=${coords_arr.join(',')}&type=${type}&area=${area}&floors=${floors}&schools=${important}&n=${houses}&metro=${metro}&time=${time}`
        fetch(url).then(
            function(response) {
                return response.json()
            }
        ).then(function(data){
            let p1 = document.getElementById('results')
            let l1 = document.getElementById('common')
            let p2 = document.getElementById('results2')
            let l2 = document.getElementById('crush')
            console.log(data[0])
            l1.innerHTML = `${data[0]["effect_inequality"]}%`
            p1.style.visibility = 'visible'
            l2.innerHTML = `${data[1]["using_bandwidth"]}%`
            p2.style.visibility = 'visible'
            console.log(data)
        })
    }
    var content;
    
    var moveMark = addMoveMark([21.324580, 0.951634], 'Здание))', "islands#redStretchyIcon", '<div id = "menu_move"> <ul id = "menu_move_list"> <li>info:</li></ul></div>', '#menu_move', 47)
    
    var mark1 = addMark([55.776882, 37.581352], 'Ст. Метро Белорусская', "islands#blueStretchyIcon", `<div id="menu">\ <ul id="menu_list">\<li>Пиковая нагрузка:</li>\<li>${load}</li>\<li>тыс.чел./час пик</li>\<li>${percent}%</li>\</ul>\</div>`, '#menu')
    var mark2 = addMark([55.77378, 37.54412], 'Ст. Метро Беговая', "islands#blueStretchyIcon", `<div id="menu1">\<ul id="menu_list">\<li>Пиковая нагрузка:</li>\<li>${load}</li>\<li>тыс.чел./час пик</li>\<li>${percent}%</li>\</ul>\</div>`, "#menu1" )
    var mark3 = addMark([55.774584, 37.560923], 'Дорога из центра', "islands#blueStretchyIcon", `<div id="menu2">\<ul id="menu_list">\<li>Пиковая нагрузка:</li>\<li>${load}</li>\<li>тыс. авто/час пик</li>\<li>${percent}%</li>\</ul>\</div>`, "#menu2")
    var mark4 = addMark([55.775503, 37.571737], "Дорога в центр", "islands#blueStretchyIcon", `<div id="menu3">\<ul id="menu_list">\<li>Пиковая нагрузка:</li>\<li>${load}</li>\<li>тыс. авто/час пик</li>\<li>${percent}%</li>\</ul>\</div>`, "#menu3")
    var mark5 = addMark([55.773229, 37.554314], "Дорога", "islands#blueStretchyIcon", `<div id="menu4">\<ul id="menu_list">\<li>Пиковая нагрузка:</li>\<li>${load}</li>\<li>тыс. авто/час пик</li>\<li>${percent}%</li>\</ul>\</div>`, '#menu4' )
    var mark6 = addMark([55.770859, 37.567703], "Дорога из центра", "islands#blueStretchyIcon", `<div id="menu5">\<ul id="menu_list">\<li>Пиковая нагрузка:</li>\<li>${load}</li>\<li>тыс. авто/час пик</li>\<li>${percent}%</li>\</ul>\</div>`, '#menu5' )
    var mark7 = addMark([55.772581, 37.572870], "Дорога в центр", "islands#blueStretchyIcon", `<div id="menu6">\<ul id="menu_list">\<li>Пиковая нагрузка:</li>\<li>${load}</li>\<li>тыс. авто/час пик</li>\<li>${percent}%</li>\</ul>\</div>`, "#menu6")
    var mark8 = addMark([55.773887, 37.579179], "Дорога из центра", "islands#blueStretchyIcon", `<div id="menu7">\<ul id="menu_list">\<li>Пиковая нагрузка:</li>\<li>${load}</li>\<li>тыс. авто/час пик</li>\<li>${percent}%</li>\</ul>\</div>`, '#menu7')
    var mark9 = addMark([55.775097, 37.582827], "Дорога в центр", "islands#blueStretchyIcon", `<div id="menu8">\<ul id="menu_list">\<li>Пиковая нагрузка:</li>\<li>${load}</li>\<li>тыс. авто/час пик</li>\<li>${percent}%</li>\</ul>\</div>`, '#menu8' )    
    
    metro_select.onchange = function(){
        console.log(metro_select.value)
        if (metro_select.value === 'Беговая'){
            myMap.setCenter([55.771150, 37.543381])
        }
        else if (metro_select.value === 'Белорусская'){
            myMap.setCenter([55.776882, 37.581352])
        }
    }
    /*function changeColor(id, color, mark){
        var element = document.getElementById(id);
        console.log(element)
        if (1==1){
            
            element.style.background = 'green';
            alert('bhnjmk')
        }
        else if (mark > 40 && mark <= 65){
            element.style.background = 'yellow'
        }
        else if (mark > 65){
            element.style.background = 'red'
        }
    }

    mark1 = changeColor('menu', mark1) */
}
var select = document.getElementById('type_change');
var btn = document.getElementById('ok_btn')
select.onchange = function () {
    if (select.value === 'ЖК') {
            document.getElementById('qnt').style.visibility = 'visible'
    } else {
            document.getElementById('qnt').style.visibility = 'hidden'
    }
}