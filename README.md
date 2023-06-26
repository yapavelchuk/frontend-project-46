### Hexlet tests and linter status:
[![Actions Status](https://github.com/yapavelchuk/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/yapavelchuk/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/320da0307d06439ba8d2/maintainability)](https://codeclimate.com/github/yapavelchuk/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/320da0307d06439ba8d2/test_coverage)](https://codeclimate.com/github/yapavelchuk/frontend-project-46/test_coverage)

## Вычислитель отличий
Программа, определяющая разницу между двумя структурами данных. Это популярная задача, для решения которой существует множество онлайн сервисов, например http://www.jsondiff.com/. Подобный механизм используется при выводе тестов или при автоматическом отслеживании изменений в конфигурационных файлах.

### Возможности программы:
1. Сравнение плоских файлов с расширениями: '.json', '.yml', 'yaml'.
2. Генерация результата сравнения в форматах: stylish, plain, json.

### Требования
Node.js v19.1.0

### Установка
````sh
$ git clone https://github.com/yapavelchuk/frontend-project-46.git
$ cd frontend-project-46
$ make install
````

#### Cравнение плоских файлов 
[![asciicast](https://asciinema.org/a/vyu5yJOH20p69cdlAuyULFH99.svg)](https://asciinema.org/a/vyu5yJOH20p69cdlAuyULFH99)
[![asciicast](https://asciinema.org/a/sjHgZaTNy6Mai7zDwO1vMJg9U.svg)](https://asciinema.org/a/sjHgZaTNy6Mai7zDwO1vMJg9U)

#### Рекурсивное сравнение 
[![asciicast](https://asciinema.org/a/3zNEY7GpvRQWvvRR5weRQlHpV.svg)](https://asciinema.org/a/3zNEY7GpvRQWvvRR5weRQlHpV)
