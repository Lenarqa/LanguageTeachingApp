heroku может долго грузиться (секунд 15-30)

[Зайти посмотреть / Enter to watch](https://language-teaching-app.herokuapp.com/).

#Пометки

Там есть warning (он не влияет на работу), я так понял что он связан с тем, что в react-grid-dnd есть только метод onChange и он начинает менять state уже при наведении на блок для фразы, при этом state меняется, но визуально элемент в нем не отображается и это не нравиться реакту. Если бы там был метод onDragEnd то я бы перенес логику обновления state туда. 

Я не добавлял ENV файл для ссылки на ваш апи, потому что в heroru не нашел как добавить константу для ссылки на api.

Там кстати человечек нарисован с помощью css в span, я не сразу понял, что можно в прототипе открыть проект и выгрузить оттуда SVG или PNG вариант. Человечек получился прикольным, поэтому раз это тестовый проект я его оставил. 

