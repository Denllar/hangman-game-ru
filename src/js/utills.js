export const darkModeHandle = () => {
    const darkModeSwithcer = document.getElementById('toggleDarkMode')
    const htmlElement = document.documentElement

    if (localStorage.getItem('mode') == 'dark'){
        htmlElement.classList.add('dark')
        darkModeSwithcer.checked  = true
    }

    darkModeSwithcer.addEventListener('input', ()=>{
        htmlElement.classList.toggle('dark')
        if (htmlElement.classList.contains('dark')){
            localStorage.setItem('mode', 'dark')
        } else {
            localStorage.setItem('mode', 'light')
        }
    })
}