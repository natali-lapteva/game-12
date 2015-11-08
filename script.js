// Максимальное количество бросаний кубика
var MAX_TRY = 3;

// Выйгрышное число, к которому надо подойти максимально близко
var VIN_NUMBER = 12;

// Максимальное число которое может выпасть на кубике
var MAX_NUMBER = 6;

// Сюда записываем ходы игрока
var playerTryes = [];

/**
 * Сбрасываем игровой процесс
 *    - очищаем ходы игрока
 *    - удаляем все информационные сообщения
 */
function clean() {
    playerTryes = [];
    $('#player').text('');
    $('#computer').text('');
    $('#result').text('');
}

/**
 * Ход игрока
 */
function oneMore() {
    // Если пользователь пытается бросить кубик больше дозволенного,
    // предупреждаем его и завершаем код
    if (playerTryes.length >= MAX_TRY) {
        alert('К сожалению, кубик можно бросить не более ' + MAX_TRY + ' раз');
        return;
    }

    // Бросаем кубик, запоминаем результат
    playerTryes.push(getNumber());

    // Показываем сумму бросаний игрока
    showSum('player', playerTryes);

    // Показывем результат партии
    showResult(playerTryes)
}

/**
 * Ход противника
 */
function finish() {
    // Здесь хранятся ходы противника
    var computerTryes = [];

    // Бросаем кубик пока можем, стараясь не превысить выйгрышное число
    while (computerTryes.length < MAX_TRY && sum(computerTryes) < VIN_NUMBER - MAX_NUMBER / 2) {
        computerTryes.push(getNumber());
    }

    // Показываем сумму бросаний противника
    showSum('computer', computerTryes);

    // Показывем результат партии
    showResult(playerTryes, computerTryes);
}


/**
 * Бросание кубика
 */
function getNumber() {
    return Math.round(Math.random()*6 + 0.5)
}

/**
 * Показываем сумму бросаний
 */
function showSum(id, values) {
    var value = values.join(' + ') + ' = ' + sum(values);
    $('#' + id).text(value);
}

/**
 * Вычисление суммы бросаний
 */
function sum(array) {
    array = array || [];
    return array.reduce(function(acc, item) {
        return acc + item;
    }, 0);
}

/**
 * Показывем результат партии
 */
function showResult(playerTryes, computerTryes) {
    var playerSum = sum(playerTryes);
    if (playerSum < VIN_NUMBER && !computerTryes) {
        return;
    }

    var computerSum = sum(computerTryes);
    var result = '';

    // Если игрок выбросил слишком много или противник выбросил больше,
    // считаем что игрок лузер
    if (playerSum >= VIN_NUMBER || computerSum > playerSum) {
        result = 'Вы проиграли... :-('
    } else

    // Если противник выбросил слишком много или игрок выбросил больше,
    // считаем что игрок - чемпион!
    if (computerSum >= VIN_NUMBER || computerSum < playerSum) {
        result = 'Поздравляю! Вы выйграли! :-) Дай пожму руку'
    }

    // Если оба выбросили слишком много или одинаковое число,
    // считаем что наступила загадочная ничья
    if (
        (computerSum >= VIN_NUMBER && playerSum >= VIN_NUMBER) ||
        computerSum === playerSum
    ) {
        result = 'Интрига-интрига! Пока ничья'
    }

    $('#result').text(result);
}
