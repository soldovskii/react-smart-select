import * as types from '../constants/ActionTypes';

const countryList = [{"name":"Абхазия","iso":"895"},{"name":"Австралия","iso":"036"},{"name":"Австрия","iso":"040"},{"name":"Азербайджан","iso":"031"},{"name":"Албания","iso":"008"},{"name":"Алжир","iso":"012"},{"name":"Американское Самоа","iso":"016"},{"name":"Ангилья","iso":"660"},{"name":"Ангола","iso":"024"},{"name":"Андорра","iso":"020"},{"name":"Антарктида","iso":"010"},{"name":"Антигуа и Барбуда","iso":"028"},{"name":"Аргентина","iso":"032"},{"name":"Армения","iso":"051"},{"name":"Аруба","iso":"533"},{"name":"Афганистан","iso":"004"},{"name":"Багамы","iso":"044"},{"name":"Бангладеш","iso":"050"},{"name":"Барбадос","iso":"052"},{"name":"Бахрейн","iso":"048"},{"name":"Беларусь","iso":"112"},{"name":"Белиз","iso":"084"},{"name":"Бельгия","iso":"056"},{"name":"Бенин","iso":"204"},{"name":"Бермуды","iso":"060"},{"name":"Болгария","iso":"100"},{"name":"Боливия, Многонациональное Государство","iso":"068"},{"name":"Бонайре, Саба и Синт-Эстатиус","iso":"535"},{"name":"Босния и Герцеговина","iso":"070"},{"name":"Ботсвана","iso":"072"},{"name":"Бразилия","iso":"076"},{"name":"Британская территория в Индийском океане","iso":"086"},{"name":"Бруней-Даруссалам","iso":"096"},{"name":"Буркина-Фасо","iso":"854"},{"name":"Бурунди","iso":"108"},{"name":"Бутан","iso":"064"},{"name":"Вануату","iso":"548"},{"name":"Венгрия","iso":"348"},{"name":"Венесуэла Боливарианская Республика","iso":"862"},{"name":"Виргинские острова, Британские","iso":"092"},{"name":"Виргинские острова, США","iso":"850"},{"name":"Вьетнам","iso":"704"},{"name":"Габон","iso":"266"},{"name":"Гаити","iso":"332"},{"name":"Гайана","iso":"328"},{"name":"Гамбия","iso":"270"},{"name":"Гана","iso":"288"},{"name":"Гваделупа","iso":"312"},{"name":"Гватемала","iso":"320"},{"name":"Гвинея","iso":"324"},{"name":"Гвинея-Бисау","iso":"624"},{"name":"Германия","iso":"276"},{"name":"Гернси","iso":"831"},{"name":"Гибралтар","iso":"292"},{"name":"Гондурас","iso":"340"},{"name":"Гонконг","iso":"344"},{"name":"Гренада","iso":"308"},{"name":"Гренландия","iso":"304"},{"name":"Греция","iso":"300"},{"name":"Грузия","iso":"268"},{"name":"Гуам","iso":"316"},{"name":"Дания","iso":"208"},{"name":"Джерси","iso":"832"},{"name":"Джибути","iso":"262"},{"name":"Доминика","iso":"212"},{"name":"Доминиканская Республика","iso":"214"},{"name":"Египет","iso":"818"},{"name":"Замбия","iso":"894"},{"name":"Западная Сахара","iso":"732"},{"name":"Зимбабве","iso":"716"},{"name":"Израиль","iso":"376"},{"name":"Индия","iso":"356"},{"name":"Индонезия","iso":"360"},{"name":"Иордания","iso":"400"},{"name":"Ирак","iso":"368"},{"name":"Иран, Исламская Республика","iso":"364"},{"name":"Ирландия","iso":"372"},{"name":"Исландия","iso":"352"},{"name":"Испания","iso":"724"},{"name":"Италия","iso":"380"},{"name":"Йемен","iso":"887"},{"name":"Кабо-Верде","iso":"132"},{"name":"Казахстан","iso":"398"},{"name":"Камбоджа","iso":"116"},{"name":"Камерун","iso":"120"},{"name":"Канада","iso":"124"},{"name":"Катар","iso":"634"},{"name":"Кения","iso":"404"},{"name":"Кипр","iso":"196"},{"name":"Киргизия","iso":"417"},{"name":"Кирибати","iso":"296"},{"name":"Китай","iso":"156"},{"name":"Кокосовые (Килинг) острова","iso":"166"},{"name":"Колумбия","iso":"170"},{"name":"Коморы","iso":"174"},{"name":"Конго","iso":"178"},{"name":"Конго, Демократическая Республика","iso":"180"},{"name":"Корея, Народно-Демократическая Республика","iso":"408"},{"name":"Корея, Республика","iso":"410"},{"name":"Коста-Рика","iso":"188"},{"name":"Кот д'Ивуар","iso":"384"},{"name":"Куба","iso":"192"},{"name":"Кувейт","iso":"414"},{"name":"Кюрасао","iso":"531"},{"name":"Лаос","iso":"418"},{"name":"Латвия","iso":"428"},{"name":"Лесото","iso":"426"},{"name":"Ливан","iso":"422"},{"name":"Ливийская Арабская Джамахирия","iso":"434"},{"name":"Либерия","iso":"430"},{"name":"Лихтенштейн","iso":"438"},{"name":"Литва","iso":"440"},{"name":"Люксембург","iso":"442"},{"name":"Маврикий","iso":"480"},{"name":"Мавритания","iso":"478"},{"name":"Мадагаскар","iso":"450"},{"name":"Майотта","iso":"175"},{"name":"Макао","iso":"446"},{"name":"Малави","iso":"454"},{"name":"Малайзия","iso":"458"},{"name":"Мали","iso":"466"},{"name":"Малые Тихоокеанские отдаленные острова Соединенных Штатов","iso":"581"},{"name":"Мальдивы","iso":"462"},{"name":"Мальта","iso":"470"},{"name":"Марокко","iso":"504"},{"name":"Мартиника","iso":"474"},{"name":"Маршалловы острова","iso":"584"},{"name":"Мексика","iso":"484"},{"name":"Микронезия, Федеративные Штаты","iso":"583"},{"name":"Мозамбик","iso":"508"},{"name":"Молдова, Республика","iso":"498"},{"name":"Монако","iso":"492"},{"name":"Монголия","iso":"496"},{"name":"Монтсеррат","iso":"500"},{"name":"Мьянма","iso":"104"},{"name":"Намибия","iso":"516"},{"name":"Науру","iso":"520"},{"name":"Непал","iso":"524"},{"name":"Нигер","iso":"562"},{"name":"Нигерия","iso":"566"},{"name":"Нидерланды","iso":"528"},{"name":"Никарагуа","iso":"558"},{"name":"Ниуэ","iso":"570"},{"name":"Новая Зеландия","iso":"554"},{"name":"Новая Каледония","iso":"540"},{"name":"Норвегия","iso":"578"},{"name":"Объединенные Арабские Эмираты","iso":"784"},{"name":"Оман","iso":"512"},{"name":"Остров Буве","iso":"074"},{"name":"Остров Мэн","iso":"833"},{"name":"Остров Норфолк","iso":"574"},{"name":"Остров Рождества","iso":"162"},{"name":"Остров Херд и острова Макдональд","iso":"334"},{"name":"Острова Кайман","iso":"136"},{"name":"Острова Кука","iso":"184"},{"name":"Острова Теркс и Кайкос","iso":"796"},{"name":"Пакистан","iso":"586"},{"name":"Палау","iso":"585"},{"name":"Палестинская территория, оккупированная","iso":"275"},{"name":"Панама","iso":"591"},{"name":"Папский Престол (Государство — город Ватикан)","iso":"336"},{"name":"Папуа-Новая Гвинея","iso":"598"},{"name":"Парагвай","iso":"600"},{"name":"Перу","iso":"604"},{"name":"Питкерн","iso":"612"},{"name":"Польша","iso":"616"},{"name":"Португалия","iso":"620"},{"name":"Пуэрто-Рико","iso":"630"},{"name":"Республика Македония","iso":"807"},{"name":"Реюньон","iso":"638"},{"name":"Россия","iso":"643"},{"name":"Руанда","iso":"646"},{"name":"Румыния","iso":"642"},{"name":"Самоа","iso":"882"},{"name":"Сан-Марино","iso":"674"},{"name":"Сан-Томе и Принсипи","iso":"678"},{"name":"Саудовская Аравия","iso":"682"},{"name":"Свазиленд","iso":"748"},{"name":"Святая Елена, Остров вознесения, Тристан-да-Кунья","iso":"654"},{"name":"Северные Марианские острова","iso":"580"},{"name":"Сен-Бартельми","iso":"652"},{"name":"Сен-Мартен","iso":"663"},{"name":"Сенегал","iso":"686"},{"name":"Сент-Винсент и Гренадины","iso":"670"},{"name":"Сент-Люсия","iso":"662"},{"name":"Сент-Китс и Невис","iso":"659"},{"name":"Сент-Пьер и Микелон","iso":"666"},{"name":"Сербия","iso":"688"},{"name":"Сейшелы","iso":"690"},{"name":"Сингапур","iso":"702"},{"name":"Синт-Мартен","iso":"534"},{"name":"Сирийская Арабская Республика","iso":"760"},{"name":"Словакия","iso":"703"},{"name":"Словения","iso":"705"},{"name":"Соединенное Королевство","iso":"826"},{"name":"Соединенные Штаты","iso":"840"},{"name":"Соломоновы острова","iso":"090"},{"name":"Сомали","iso":"706"},{"name":"Судан","iso":"736"},{"name":"Суринам","iso":"740"},{"name":"Сьерра-Леоне","iso":"694"},{"name":"Таджикистан","iso":"762"},{"name":"Таиланд","iso":"764"},{"name":"Тайвань (Китай)","iso":"158"},{"name":"Танзания, Объединенная Республика","iso":"834"},{"name":"Тимор-Лесте","iso":"626"},{"name":"Того","iso":"768"},{"name":"Токелау","iso":"772"},{"name":"Тонга","iso":"776"},{"name":"Тринидад и Тобаго","iso":"780"},{"name":"Тувалу","iso":"798"},{"name":"Тунис","iso":"788"},{"name":"Туркмения","iso":"795"},{"name":"Турция","iso":"792"},{"name":"Уганда","iso":"800"},{"name":"Узбекистан","iso":"860"},{"name":"Украина","iso":"804"},{"name":"Уоллис и Футуна","iso":"876"},{"name":"Уругвай","iso":"858"},{"name":"Фарерские острова","iso":"234"},{"name":"Фиджи","iso":"242"},{"name":"Филиппины","iso":"608"},{"name":"Финляндия","iso":"246"},{"name":"Фолклендские острова (Мальвинские)","iso":"238"},{"name":"Франция","iso":"250"},{"name":"Французская Гвиана","iso":"254"},{"name":"Французская Полинезия","iso":"258"},{"name":"Французские Южные территории","iso":"260"},{"name":"Хорватия","iso":"191"},{"name":"Центрально-Африканская Республика","iso":"140"},{"name":"Чад","iso":"148"},{"name":"Черногория","iso":"499"},{"name":"Чешская Республика","iso":"203"},{"name":"Чили","iso":"152"},{"name":"Швейцария","iso":"756"},{"name":"Швеция","iso":"752"},{"name":"Шпицберген и Ян Майен","iso":"744"},{"name":"Шри-Ланка","iso":"144"},{"name":"Эквадор","iso":"218"},{"name":"Экваториальная Гвинея","iso":"226"},{"name":"Эландские острова","iso":"248"},{"name":"Эль-Сальвадор","iso":"222"},{"name":"Эритрея","iso":"232"},{"name":"Эстония","iso":"233"},{"name":"Эфиопия","iso":"231"},{"name":"Южная Африка","iso":"710"},{"name":"Южная Джорджия и Южные Сандвичевы острова","iso":"239"},{"name":"Южная Осетия","iso":"896"},{"name":"Южный Судан","iso":"728"},{"name":"Ямайка","iso":"388"},{"name":"Япония","iso":"392"}];

const initialState = {
	countryList: []
};

export default function CountryListReducer(state = initialState, action) {
	switch (action.type) {

		case types.GET_COUNTRY_LIST:
			return { countryList };

		default:
			return state;
	}
};