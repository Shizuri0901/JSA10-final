/// Init
const us = document.getElementById('em')
const ps = document.getElementById('ps')
const pscf = document.getElementById('pscf')
if (localStorage.getItem('Acc') == null){
  localStorage.setItem('Acc', '[]')
}
if (localStorage.getItem('login') == null){
  localStorage.setItem('login', false)
}

/// Xác thực thông tin
async function reg(){
  console.log(us,ps.value,pscf.value)
  const errorMessage = document.querySelector('.text-danger');
  if (ps.value != pscf.value || ps.value === '') {
    errorMessage.classList.remove('visually-hidden');
    if (ps.value === '') {
      errorMessage.textContent = "Please enter your password";
    } else {
      errorMessage.textContent = "Wrong password confirm or password";
    }
  } 
  else if (us.value == '' || !us.value.includes("@")) {
    errorMessage.textContent = 'Please enter your Email properly';
    errorMessage.classList.remove('visually-hidden');
  } 
  else {
    Regist()
  }
}

/// Đăng kí
function Regist(){
  let prev_acc = JSON.parse(localStorage.getItem('Acc')) || [];
  let n_us = us.value;
  let n_ps = ps.value;
  let n_acc = { 'email': n_us, 'password': n_ps };
  prev_acc.push(n_acc);
  let n_acc_str = JSON.stringify(prev_acc);
  localStorage.setItem('Acc', n_acc_str);
  setTimeout(location.href = 'https://shizuri0901.github.io/JSA10-final/sign_in.html',1000)
}

/// Đăng nhập
function CheckAcc(){
  const btn = document.querySelector('#go')
  let prev_acc = JSON.parse(localStorage.getItem('Acc')) || [];
  console.log(prev_acc);
  let errorMessage = document.querySelector('.text-danger');
  prev_acc.forEach(item => {
    prev_us = item.email
    prev_ps = item.password
    if (us.value == prev_us && ps.value == prev_ps){
      localStorage.setItem('User',us.value)
      localStorage.setItem('login',true)
      tru = true
      location.href = 'https://shizuri0901.github.io/JSA10-final/home.html'
    }
    else if(us.value == prev_us || ps.value == prev_ps){
      errorMessage.classList.remove('visually-hidden')
      btn.classList.remove('btn-primary')
      btn.classList.add('btn-danger')
    }
    else{
      errorMessage.classList.remove('visually-hidden')
      errorMessage.textContent = "There is no account such similar please register your account"
      btn.classList.remove('btn-primary')
      btn.classList.add('btn-danger')
    }
  });    
}
