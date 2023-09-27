function navigate(type) {
    console.log('2233')
    const auth = localStorage.getItem('auth');
    if (!auth || auth.length === 0) {
        location.href = './login.html'
        return
    }
    location.href = `./${type}.html`
}