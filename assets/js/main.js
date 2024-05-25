document.addEventListener('DOMContentLoaded', () => {

    uLoadScreen()
    setTimeout(dLoadScreen, 2000)
    setTimeout(showApp, 2000)

    document.querySelector('.close').addEventListener('click', () => {
        document.querySelector('.addTaskForm').style.zIndex = "-1";
        anime({
            targets: '.addTaskForm',
            opacity: [1, 0],
            translateY: [0, -250],
            easing: 'spring(1, 80, 10, 0)',
            duration: 2000
        });
    });

    document.querySelector('.add').addEventListener('click', () => {
        document.querySelector('.addTaskForm').style.zIndex = "1";
        anime({
            targets: '.addTaskForm',
            opacity: [0, 1],
            translateY: [250, 0],
            duration: 2000
        });
    });
});

const uLoadScreen = () => {
    anime({
        targets: '.loader',
        opacity: [0, 1],
        translateY: [250, 0],
        duration: 2000
    });
}

const dLoadScreen = () => {
    anime({
        targets: '.loader',
        opacity: [1, 0],
        translateY: [0, -250],
        duration: 5000,
        easing: 'spring(1, 80, 10, 0)'
    })
}

const showApp = () => {
    anime({
        targets: '.tasks',
        opacity: [0, 1],
        translateX: [250, 0],
        duration: 4000,
        easing: 'spring(1, 80, 10, 0)'
    })
}
